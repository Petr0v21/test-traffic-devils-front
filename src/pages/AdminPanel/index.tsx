import React, {useEffect, useState} from "react";
import {ContentType} from "../../types";
import {useAuth} from "../../hooks/auth.hook";
import Item from "../../app/component/AdminPanel/Item";

const AdminPanel = () => {
  const [content, setContent] = useState<ContentType[]>([]);
  const {token} = useAuth();
  const getContent = async () => {
    try {
      await fetch("http://localhost:4040/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": `${token}`,
        },
      })
        .then((res) => res.json())
        .then((json) => setContent(json));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (token) {
      getContent();
    }
  }, [token]);
  return (
    <div className="admin_panel">
      {content.map((item) => (
        <Item {...item} key={item.id}></Item>
      ))}
    </div>
  );
};

export default AdminPanel;
