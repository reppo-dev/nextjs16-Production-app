"use client";

import { useActionState } from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { LoaderIcon, SparkleIcon } from "lucide-react";
import addProduct, { FormState } from "./product-action";

const initialState: FormState = {
  success: false,
  errors: {},
  message: "",
};

const ProductSubmitForm = () => {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    addProduct,
    initialState,
  );

  return (
    <form className="space-y-8" action={formAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Product Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="My Awesome Product"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="slug">Slug</FieldLabel>
          <Input
            id="slug"
            name="slug"
            placeholder="my-awesome-product"
            required
          />
          <FieldDescription>
            URL-friendly version of your product name
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="tagline">Tagline</FieldLabel>
          <Input
            id="tagline"
            name="tagline"
            placeholder="A brief, catchy description"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            name="description"
            placeholder="Tell us more about your product..."
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="websiteUrl">Website URL</FieldLabel>
          <Input
            id="websiteUrl"
            name="websiteUrl"
            placeholder="https://yourproduct.com"
          />
          <FieldDescription>
            Enter your product&apos;s website or landing page
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="tag">Tags</FieldLabel>
          <Input
            id="tag"
            name="tag"
            placeholder="ai,saas,productivity"
            required
          />
          <FieldDescription>
            Comma-separated tags (e.g. ai, saas, productivity)
          </FieldDescription>
        </Field>
        {state.message && (
          <Field>
            <p
              className={
                state.success
                  ? "text-green-600 text-sm"
                  : "text-red-600 text-sm"
              }
            >
              {state.message}
            </p>
          </Field>
        )}
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <LoaderIcon size={16} className="animate-spin" />
            ) : (
              <>
                <SparkleIcon size={16} />
                Submit Product
              </>
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default ProductSubmitForm;
