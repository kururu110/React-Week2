import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";
import "./assets/style.css";

// API 設定
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function App() {
  // 表單資料狀態(儲存登入表單輸入)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  // 登入狀態管理(控制顯示登入或產品頁）
  const [isAuth, setIsAuth] = useState(false);

  const handleInputChange = (e) =>{
    const { name , value } = e.target;
    // console.log(name,value)
    setFormData((preData) =>({
      ...preData,
      [name]:value,
    }));
  }

  const onSubmit = async (e) =>{
    try {
      e.preventDefault();
      const response = await axios.post(`${API_BASE}/admin/signin`, formData);
      // console.log(response)
      const {token, expired} = response.data;
      document.cookie = `hextoken=${token};expires=${new Date(expired)};`;
      axios.defaults.headers.common["Authorization"] = token;
      setIsAuth(true);
    } catch (error) {
      console.error("登入失敗:", error);
      alert("登入失敗，請檢查帳號密碼是否正確");
    }
  }

  return (
    <>
    {!isAuth ? (
      <div className='container'>
        <h1>請先登入</h1>
        <form onSubmit={(e)=> onSubmit(e)}>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" name="username" placeholder="name@example.com" value={formData.username} onChange={(e) => handleInputChange(e)} />
            <label htmlFor="floatingInput">Email address</label>
            </div>
          <div className="form-floating">
            <input type="password" className="form-control" name="password" placeholder="Password" value={formData.password} onChange={(e) => handleInputChange(e)} />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className='btn btn-primary mt-2' type='submit'>登入</button>
        </form>
    </div>) : (
      <div className="container">已登入</div>
    )
    }
    </>
  );
}

export default App;
