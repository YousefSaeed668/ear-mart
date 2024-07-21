import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5;
const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const onlyLettersAndSpaces = /^[a-zA-Z\s]*$/;
export const signupUserSchema = z.object({
  FullName: z
    .string()
    .min(3)
    .max(50)
    .refine((val) => onlyLettersAndSpaces.test(val), {
      message: "FullName can only contain letters and spaces",
    }),
  Email: z.string().email(),
  Password: z.string().min(8).max(100),
  Role: z.literal("Consumer"),
});
const signupSellerSchemaStep2 = z.object({
  Address: z.string().min(15).max(150),
  City: z.string().min(3).max(100),
  PostalCode: z.string().min(3).max(16),
  FirstName: z
    .string()
    .min(3)
    .max(50)
    .refine((val) => onlyLettersAndSpaces.test(val), {
      message: "First Name can only contain letters and spaces",
    }),
  LastName: z
    .string()
    .min(3)
    .max(50)
    .refine((val) => onlyLettersAndSpaces.test(val), {
      message: "Last Name can only contain letters and spaces",
    }),
  BusinessEmail: z.string().email(),
  PhoneNumber: z.string().min(3).max(100),
  Comment: z.string().min(2).max(100),
  Website: z.string().url(),
  MainInventoryAdress: z.string().min(3).max(100),
  Certificate: z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "File Size must be less than 1MB")
    .refine((file) => {
      return !file || ACCEPTED_FILE_TYPES.includes(file.type);
    }, "File must be an Image"),
});

export const signupSellerSchema = z
  .object({
    Businessname: z.string().min(2).max(100),
    Email: z.string().email(),
    Password: z
      .string()
      .min(8, { message: "Password must contain at least 8 character" })
      .max(100),
    ConfirmPassword: z.string().min(8).max(100),
  })
  .superRefine(({ Password }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) =>
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;
    for (let i = 0; i < Password.length; i++) {
      let ch = Password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }
    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      checkPassComplexity.addIssue({
        path: ["Password"],
        code: "custom",
        message: "password does not meet complexity requirements",
      });
    }
  })
  .superRefine(({ ConfirmPassword, Password }, checkConfirmPass) => {
    if (ConfirmPassword !== Password) {
      checkConfirmPass.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["ConfirmPassword"],
      });
    }
  })
  .and(signupSellerSchemaStep2);

export type SignupSellerType = z.infer<typeof signupSellerSchema>;

export const signinUser = z.object({
  Email: z.string().email(),
  Password: z.string().min(8).max(100),
});

export type SignInUserType = z.infer<typeof signinUser>;

const ProductSpecificationSchema = z.object({
  Discount: z.boolean().default(false),
  DiscountPercent: z.string().optional(),
  Color: z.string(),
  Size: z.string(),
  Price: z.string(),
  StockQuantity: z.string(),
});

export const createProductFormSchema = z.object({
  ProductTitle: z.string(),
  SubTitle: z.string().optional(),
  ProductDescription: z.string(),
  ProductVariants: z.array(ProductSpecificationSchema),
});

export type createProductFormType = z.infer<typeof createProductFormSchema>;
