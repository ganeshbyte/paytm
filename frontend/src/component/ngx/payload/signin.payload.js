export function mapToSigninPayload(formData) {
  return { username: formData.email, password: formData.password };
}
