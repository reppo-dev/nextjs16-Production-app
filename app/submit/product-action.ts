"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "../../components/products/product-validation";
import z from "zod";
import { db } from "@/db";
import { products } from "@/db/schema";

export type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message: string;
};

const addProduct = async (
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

export default addProduct;
