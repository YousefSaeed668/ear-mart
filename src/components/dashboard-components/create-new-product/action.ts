"use server";

export async function getAllCategories() {
  const respond = await fetch(
    "http://ear-mart.runasp.net/api/category/GetAllCategories"
  );
  const categories: Category[] = await respond.json();
  return categories;
}
