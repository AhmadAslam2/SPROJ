import { Card } from "antd";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthForm } from "../components/Forms/AuthForm";
import { useRouter } from "next/router";
import { NGOContext } from "../context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  const [state, setState] = useContext(NGOContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/login`,
        {
          email,
          password,
        }
      );
      // update context
      setState({
        ngo: data.ngo,
        token: data.token,
      });
      // save to local storage
      window.localStorage.setItem("auth", JSON.stringify(data));
      //console.log(data)
      router.push("/");
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  if (state && state.token) router.push('/');

  return (
    <div className=" vh-100 d-flex justify-content-center align-items-center bg-secondary">
      <Card
        className="bg-light"
        title="Login"
        bordered={true}
        style={{ width: 1000, height: 600 }}
      >
        <AuthForm
          handleSubmit={handleSubmit}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
          ok={ok}
          setOk={setOk}
          page="login"
        />
      </Card>
    </div>
  );
};

export default Login;
