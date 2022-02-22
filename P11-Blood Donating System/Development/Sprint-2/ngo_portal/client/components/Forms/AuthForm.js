import { Modal } from "antd";
import Link from "next/link";
import { SyncOutlined } from "@ant-design/icons";

export const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  ok,
  setOk,
  page,
}) => (
  <>
    <form onSubmit={handleSubmit}>
      {page !== "login" && (
        <div className="p-3 form-group">
          <label className="text-muted">Your NGO's name</label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter NGO's name:"
          />
        </div>
      )}

      <div className="p-3 form-group">
        <label className="text-muted">Your NGO's Email Address</label>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
          placeholder="Enter NGO's Email:"
        />
      </div>

      <div className="p-3 form-group">
        <label className="text-muted">Password</label>

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          placeholder="Enter NGO's Password:"
        />
      </div>
      <div className="d-flex justify-content-center p-3">
        <button className="btn btn-primary col-12">
          {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
        </button>
      </div>
    </form>
    <Modal
      title="Registered!"
      visible={ok}
      onCancel={() => setOk(false)}
      footer={null}
    >
      <p>Your NGO has been successfully registered.</p>
      <Link href="/login">
        <a className="btn btn-primary btn-sm">Login</a>
      </Link>
    </Modal>
    <div className="text-center">
      {page == "login" ? (
        <Link href="/register">
          <a>Not registered? Register now!</a>
        </Link>
      ) : (
        <Link href="/login">
          <a>Already registered? Login.</a>
        </Link>
      )}
    </div>
  </>
);

//export default AuthForm;
