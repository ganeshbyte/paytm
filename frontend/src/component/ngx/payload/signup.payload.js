export default function mapToSignupPayload(formData) {
  return {
    firstName: formData.firstname,
    lastName: formData.lastname,
    username: formData.email,
    password: formData.password,
  };
}
