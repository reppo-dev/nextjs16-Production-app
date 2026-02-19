"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "../../components/products/product-validation";
import z from "zod";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message: string;
};

export const addProduct = async (
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return {
        success: false,
        errors: {},
        message: "You must be signed in to submit a product.",
      };
    }

    const user = await currentUser();
    const userEmail =
      (await user?.primaryEmailAddress?.emailAddress) || "anysome";

    const rawFormDataEntries = Object.fromEntries(formData.entries());

    const rawFormData = Object.fromEntries(
      Object.entries(rawFormDataEntries).map(([key, value]) => [
        key,
        key === "tag"
          ? (value as string).split(",").map((v) => v.trim())
          : value,
      ]),
    );
    console.log("Server action called", rawFormData);

    const validatedResult = productSchema.safeParse(rawFormData);
    console.log("validatedResult", validatedResult);

    if (!validatedResult.success) {
      console.log("Validation errors:", validatedResult.error.flatten());
      return {
        success: false,
        errors: validatedResult.error.flatten().fieldErrors,
        message: "Please fix the highlighted errors and try again.",
      };
    }

    const data = validatedResult.data;
    console.log("data", data);

    await db.insert(products).values({
      name: data.name,
      slug: data.slug,
      tagline: data.tagline,
      description: data.description,
      websiteUrl: data.websiteUrl,
      tag: data.tag,
      status: "pending",
      submittedBy: userEmail,
      organizationId: orgId,
      userId,
    });

    return {
      success: true,
      errors: {},
      message: "Product added successfully.",
    };
  } catch (error) {
    console.error("Error adding product:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: {},
        message: "Validation failed, Please check the form.",
      };
    }

    return {
      success: false,
      errors: {},
      message: "Something went wrong while adding the product.",
    };
  }
};

export const upvoteProductAction = async (productId: string) => {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "You must be signed in to submit a product",
      };
    }

    if (!orgId) {
      return {
        success: false,
        message: "You must be a member of an organization to submit a product",
      };
    }

    await db
      .update(products)
      .set({ voteCount: sql`GREATEST(0,${products.voteCount} + 1)` })
      .where(eq(products.id, productId));

    revalidatePath("/");
    return {
      success: true,
      message: "successe to upvote product",
      voteCount: +1,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to upvote product",
      voteCount: 0,
    };
  }
};

export const downvoteProductAction = async (productId: string) => {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "You must be signed in to submit a product",
      };
    }

    if (!orgId) {
      return {
        success: false,
        message: "You must be a member of an organization to submit a product",
      };
    }

    await db
      .update(products)
      .set({ voteCount: sql`GREATEST(0,${products.voteCount} - 1)` })
      .where(eq(products.id, productId));
    revalidatePath("/");
    return {
      success: true,
      message: "successe to downvote product",
      voteCount: -1,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to downvote product",
      voteCount: 0,
    };
  }
};
