import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom";
import "./AddEdit.css";
import {dataHeroes} from "../dataHeroes";
import axios from "axios";
import {toast} from "react-toastify";

type HeroState = {
  attribute: string;
  hero: string;
  status: string;
  fraction: string;
  date: any;
};

const initialState: HeroState = {
  attribute: '',
  hero: '',
  status: '',
  fraction: '',
  date: '',
}

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const {hero, status, fraction, date} = state;
  const navigate = useNavigate();
  const {id} = useParams();


  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => {
        if (id) {
          const dateString = new Date(resp.data[0].date)
          console.log('ID')
          const formatDate = `${dateString.getFullYear()}-${(dateString.getMonth() + 1).toString().padStart(2, '0')}-${(dateString.getDate()).toString().padStart(2, '0')}`;
          setState({...resp.data[0], date: formatDate})
        } else {
          console.log('RES', resp.data[0])
          setState({...resp.data[0]})
        }
      })
  }, [id])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // @ts-ignore
    const attribute = hero ? dataHeroes && Object.entries(dataHeroes).find(([_, value]) => value.includes(hero))[0] : '';

    if (!attribute || !hero || !status || !fraction || !date) {
      toast.error("Please provide value into each input field");
    } else {
      if (!id) {
        axios.post("http://localhost:5000/api/post", {attribute, hero, status, fraction, date})
          .then(() => {
            setState({attribute, hero, status, fraction, date})
          }).catch((err) => toast.error(err.response.data));
        toast.success('Contact Updated Successfully')
      } else {
        axios.put("http://localhost:5000/api/update/" + id, {attribute, hero, status, fraction, date})
          .then(() => {
            setState(initialState)
          }).catch((err) => toast.error(err.response.data));
        toast.success('Hero Added Successfully')
      }
      setTimeout(() => navigate("/"), 500)

    }
  }

  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    setState({...state, [name]: value})
  }

  console.log(state)

  return (
    <div style={{marginTop: "100px"}}>
      <form style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: 'center'
      }}
            onSubmit={handleSubmit}>
        <label htmlFor="name">Hero Name:</label>
        <select id={"hero"} name={"hero"} value={hero || ''}
                onChange={handleInputChange}>
          <option value="">Select Hero</option>
          {Object.keys(dataHeroes).map((category) => (
            <optgroup label={category} key={category}>
              {dataHeroes[category].map((hero: string, index: number) => (
                <option key={index} value={hero}>{hero}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <label htmlFor="name">Status:</label>
        <select id={"status"} name={"status"} value={status || ''}
                onChange={handleInputChange}>
          <option value="">Select Status</option>
          <option style={{color: 'green'}} value="Win">Win</option>
          <option style={{color: '#ec3d06'}} value="Loss">Loss</option>
        </select>
        <label htmlFor="email">Fraction:</label>
        <select id={"fraction"} name={"fraction"} value={fraction || ''}
                onChange={handleInputChange}>
          <option value="">Select Fraction</option>
          <option style={{color: 'green'}} value="Radiant">Radiant</option>
          <option style={{color: '#ec3d06'}} value="Dire">Dire</option>
        </select>
        <label htmlFor="contact">Date:</label>
        <input type="date" id={"date"} name={"date"} value={date || ''}
               onChange={handleInputChange}/>
        <input type="submit" value={id ? "Update" : "Save"}/>
        <Link to={"/"}><input type="button" value={"Go Back"}/></Link>
      </form>
    </div>
  );
};

export default AddEdit;
