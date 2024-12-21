"use client";
import GradientButton from "@/components/common/buttons/GradientButton";
import FileUploadField from "@/components/common/FileUploadField";
import { MyTextInput } from "@/components/common/FormFields/MyTextInput";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import CategorySvs from "@/services/Category";
import FurnitureItemsSvs from "@/services/FurnitureItems";
import { CategoryActions } from "@/store/Slices/CategorySlice";
import { SnackBarActions } from "@/store/Slices/SnackBarSlice";
import { AddFurnitureItemFormSchema } from "@/utils/FormValidations/ValidationSchemas";
import { MenuItem, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AddFurnitureItemForm = () => {
  const categories = useAppSelector((store) => store.categories);
  const dispatch = useAppDispatch();
  const { AddCategories } = CategoryActions;
  const { addMessage } = SnackBarActions;
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: FurnitureItemsSvs.addFurnitureItem,
    onSettled(data) {
      dispatch(
        addMessage({
          message: data?.message ?? "",
          type: data?.error ? "error" : "success",
        })
      );
      if(!data?.error){
        router.push(`/products/upload-media?itemId=${data?.id}&mediaType=image`)
      }
    },
  });

  const initialValues = {
    name: "",
    price: 0,
    stock_quantity: 1,
    category_id: 0,
    color: "",
    weight: 0,
    dimension: "",
    description: "",
  };

  useEffect(() => {
    (async () => {
      const data = await CategorySvs.getCategories();
      if (!data) return;
      dispatch(
        AddCategories([
          { value: 0, label: "All categories" },
          ...data.map((cat) => ({ value: cat.id, label: cat.name })),
        ])
      );
    })();
  }, []);

  const handleSubmit = (values: typeof initialValues) => {
    mutate({...values });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Add Furniture Item
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={AddFurnitureItemFormSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleSubmit, setFieldValue, values }) => (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-lg shadow-lg w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Furniture title*
                </label>
                <MyTextInput
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter furniture title"
                  className={`${
                    touched.name && errors.name
                      ? "border-red-600 focus:ring-red-600"
                      : "border-gray-300 focus:ring-blue-500"
                  } block placeholder:text-gray-300 w-full mt-1 rounded-md border p-2 focus:outline-none`}
                />
              </div>

              <div>
                <label
                  htmlFor="category_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category*
                </label>
                <TextField
                  onChange={(event) => {
                    const { value } = event.target;
                    setFieldValue("category_id", value); // Update Formik state
                  }}
                  select
                  variant="outlined"
                  size="small"
                  value={values.category_id}
                  className="w-full !mt-1"
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            {/* Second Row: Price and Stock Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price*
                </label>
                <MyTextInput
                  id="price"
                  name="price"
                  type="text"
                  placeholder="Enter price"
                  className={`${
                    touched.price && errors.price
                      ? "border-red-600 focus:ring-red-600"
                      : "border-gray-300 focus:ring-blue-500"
                  } block placeholder:text-gray-300 w-full mt-1 rounded-md border p-2 focus:outline-none`}
                />
              </div>

              <div>
                <label
                  htmlFor="stock_quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stock Quantity*
                </label>
                <MyTextInput
                  id="stock_quantity"
                  name="stock_quantity"
                  type="number"
                  placeholder="Enter stock quantity"
                  className={`${
                    touched.stock_quantity && errors.stock_quantity
                      ? "border-red-600 focus:ring-red-600"
                      : "border-gray-300 focus:ring-blue-500"
                  } block placeholder:text-gray-300 w-full mt-1 rounded-md border p-2 focus:outline-none`}
                />
              </div>
            </div>

            {/* Remaining Rows: Similar Logic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Weight(kg)
                </label>
                <MyTextInput
                  id="weight"
                  name="weight"
                  placeholder="Enter weight"
                  className={`${
                    touched.weight && errors.weight
                      ? "border-red-600 focus:ring-red-600"
                      : "border-gray-300 focus:ring-blue-500"
                  } block placeholder:text-gray-300 w-full mt-1 rounded-md border p-2 focus:outline-none`}
                />
              </div>

              <div>
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700"
                >
                  Color
                </label>
                <MyTextInput
                  id="color"
                  name="color"
                  type="text"
                  placeholder="Enter color"
                  className={`${
                    touched.color && errors.color
                      ? "border-red-600 focus:ring-red-600"
                      : "border-gray-300 focus:ring-blue-500"
                  } block placeholder:text-gray-300 w-full mt-1 rounded-md border p-2 focus:outline-none`}
                />
              </div>
            </div>

            {/* Dimension and Description */}
            <div className="grid grid-cols-1">
              <label
                htmlFor="dimension"
                className="block text-sm font-medium text-gray-700"
              >
                Dimension
              </label>
              <MyTextInput
                id="dimension"
                name="dimension"
                placeholder="Enter dimension e-g 10x10x10"
                className={`${
                  touched.dimension && errors.dimension
                    ? "border-red-600 focus:ring-red-600"
                    : "border-gray-300 focus:ring-blue-500"
                } block placeholder:text-gray-300 w-full mt-1 rounded-md border p-2 focus:outline-none`}
              />
            </div>
            <div className="grid grid-cols-1">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <TextField
                multiline
                rows={4} // Number of visible rows
                id="description"
                name="description"
                placeholder="Enter description"
                className={`${
                  touched.description && errors.description
                    ? "border-red-600 focus:ring-red-600"
                    : "border-gray-300 focus:ring-blue-500"
                } block !placeholder:text-gray-300 w-full mt-1 rounded-md border p-2 focus:outline-none`}
              />
            </div>
            {/* Submit Button */}
            <div className="flex justify-end">
              <GradientButton disabled={isPending} type="submit">
                Add Furniture
              </GradientButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddFurnitureItemForm;
