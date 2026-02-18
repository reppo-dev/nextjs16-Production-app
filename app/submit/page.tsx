import SectionHeader from "@/components/common/section-header";
import { SparklesIcon } from "lucide-react";
import React from "react";
import ProductSubmitForm from "./product-submit-form";

const SubmitPage = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Submit Your Project"
          icon={SparklesIcon}
          description="Shar your creation with the community, Your  submission will be reviewed before going live."
        />
        <div className="max-w-2xl mx-auto">
          <ProductSubmitForm />
        </div>
      </div>
    </section>
  );
};

export default SubmitPage;
