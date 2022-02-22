import { Card } from "antd";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthForm } from "../components/Forms/AuthForm";
import { NGOContext } from "../context";
import { useRouter } from "next/router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const [state] = useContext(NGOContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/register`,
        {
          name,
          email,
          password,
        }
      );
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      setOk(data.ok);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  if (state && state.token) router.push("/");

  return (
    <div className=" vh-100 d-flex justify-content-center align-items-center bg-secondary">
      <Card
        className="bg-light"
        title="Register your NGO"
        bordered={true}
        style={{ width: 1000, height: 600 }}
      >
        <AuthForm
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
          ok={ok}
          setOk={setOk}
        />
      </Card>
    </div>
  );
};

export default Register;
