import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import {api} from '../App';
import strengthIcon from '../assets/icon/Strength.png';
import agilityIcon from '../assets/icon/Agility.png';
import intelligenceIcon from '../assets/icon/Intelligence.png';
import universalIcon from '../assets/icon/Universal.png';

type HeroState = {
  id: number;
  attribute: string;
  hero: string;
  status: string;
  fraction: string;
  date: any;
};

const initialState: HeroState = {
  id: 0,
  attribute: '',
  hero: '',
  status: '',
  fraction: '',
  date: '',
}

enum Attribute {
  STRENGTH = 'Strength',
  AGILITY = 'Agility',
  INTELLIGENCE = 'Intelligence',
  UNIVERSAL = 'Universal',
}

const Home = () => {
  const [data, setData] = useState<HeroState[]>([initialState]);

  const attributeIcons = {
    [Attribute.STRENGTH]: strengthIcon,
    [Attribute.AGILITY]: agilityIcon,
    [Attribute.INTELLIGENCE]: intelligenceIcon,
    [Attribute.UNIVERSAL]: universalIcon,
  };
  const loadData = async () => {
    const response = await api.get("/get");
    setData(response.data);
  };

  const deleteHero = async(id: number) => {
    // if (window.confirm("Are you sure that you wanted to delete that hero?")){
    //     api.delete(`/remove/${id}`);
    //     toast.success("Hero Deleted Successfully");
    //     setTimeout(()=>loadData(),500)
    //   }
    if (window.confirm("Are you sure that you wanted to delete that hero?")) {
      await api.delete(`/remove/${id}`);
      toast.success("Hero Deleted Successfully");
      loadData();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={'home_wrapper'}>
      <Link to={"/add"}>
        <button className="btn btn-add">Add Game Statistics</button>
      </Link>
      <table className="styled-table">
        <thead>
        <tr>
          <th style={{textAlign: "center"}}>№</th>
          <th style={{textAlign: "center"}}>Attribute</th>
          <th style={{textAlign: "center"}}>Hero Name</th>
          <th style={{textAlign: "center"}}>Fraction</th>
          <th style={{textAlign: "center"}}>Status</th>
          <th style={{textAlign: "center"}}>Date</th>
          <th style={{textAlign: "center"}}>Action</th>
        </tr>
        </thead>
        <tbody>
        {data && data.map((item, index) => {
          const date = new Date(item.date);
          const formatDate = `${(date.getDate()).toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
          const iconAttribute = attributeIcons[item.attribute as keyof typeof attributeIcons];
          console.log(iconAttribute)
          return (
            <tr key={item.id}>
              <th scope={"row"}>{index + 1}</th>
              <th scope={"row"}><img src={iconAttribute} alt={iconAttribute}/></th>
              <td>{item.hero}</td>
              <td>{item.fraction}</td>
              <td>{item.status}</td>
              <td>{formatDate}</td>
              <td>
                <Link to={`/update/${item.id}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button className="btn btn-delete" onClick={() => deleteHero(item.id)}>Delete</button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
