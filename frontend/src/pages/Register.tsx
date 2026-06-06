import AuthLayout from "@/layouts/AuthLayout";

import RegisterForm from "@/components/RegisterForm";

const Register = () => {
  return (
    <AuthLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Create Account
        </h1>

        <p className="text-gray-500 mt-2">
          Join our community today
        </p>
      </div>

      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;