const z = require("zod");

const registerValidation = z.object({
  firstName: z
    .string()
    .min(4, { message: "First name must be greater than 4 characters" })
    .max(20, { message: "First name must be less than 20 characters" }),
  lastName: z
    .string()
    .min(4, { message: "Last name must be greater than 4 characters" })
    .max(20, { message: "Last name must be less than 20 characters" }),
  phoneNumber: z.string({
    message: "Phone number must be composed of numbers",
  }),
  email: z.string().email({ message: "Email not valid" }),
  password: z
    .string()
    .min(6, { message: "Password must be greater than 6 characters" }),
});

const eventValidation = z.object({
  eventName: z
    .string()
    .min(3, { message: "Event name must be between 3 and 128 characters" })
    .max(128, { message: "Event name must be between 3 and 128 characters" }),
  eventLocation: z
    .string()
    .min(5, { message: "Event location must be between 5 and 128 characters" })
    .max(128, {
      message: "Event location must be between 5 and 128 characters",
    }),
  eventDescription: z
    .string()
    .min(30, { message: "Event description must be more that 30 characters" }),
  eventCategory: z.enum(
    ["Art & Culture", "Technology", "Concert", "NightLife", "Sports"],
    { message: "Not a valid category" }
  ),
});

module.exports = { registerValidation, eventValidation };
