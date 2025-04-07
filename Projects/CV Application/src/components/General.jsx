import { useState } from 'react';

export default function General({ generalInfo, updateGeneral }) {
    function handleEdit() {
    }
    function handleSubmit() {}
    return (
      <>
        <label htmlFor="first_name">First Name: </label>
        <input type="text" name="first_name" id="first_name" />
        <label htmlFor="last_name">Last Name: </label>
        <input type="text" name="last_name" id="last_name" />
        <label htmlFor="user_email">Email: </label>
        <input type="email" name="user_email" id="user_email"/>
        <label htmlFor="phone_num">Telephone</label>
        <input type="tel" name="user_telephone_number" id="phone_num" />
        <button type="button" onClick={handleEdit}>Edit</button>
        <button type="button" onClick={handleSubmit()}>Submit</button>
      </>
    );
}