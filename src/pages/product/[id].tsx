import React, { ReactElement } from "react";
import MainLayout from "@/layouts";
import ItemPage from "@/components/pages/ItemPage";
import { ALL_ITEMS } from "@/constants";

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;
  const product = ALL_ITEMS.find((item) => item.id == id);

  if (!product) {
    return { notFound: true };
  }

  return { props: { product } };
};

const Product = ({ product }) => {
  return <ItemPage product={product} />;
};

Product.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Product;
