import React, { useState } from 'react';
import axios from 'axios';

interface AddStudentProps {
    onAdd: boolean;
    handleCloseModal: () => void;
    refreshStudents: () => void;
}
export default function AddStudent({ onAdd, handleCloseModal, refreshStudents }: AddStudentProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const handleAdd = () => {
        const newStudent = { name, email, address, phone, status: true };
        axios.post('http://localhost:8080/student', newStudent)
            .then(() => {
                refreshStudents(); 
                handleCloseModal(); 
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            {onAdd && (
                <div id="addStudentModal" className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form>
                                <div className="modal-header">
                                    <h4 className="modal-title">Thêm mới sinh viên</h4>
                                    <button
                                        type="button"
                                        className="close"
                                        aria-hidden="true"
                                        onClick={handleCloseModal}
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Tên sinh viên</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Địa chỉ</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Số điện thoại</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <input
                                        type="button"
                                        className="btn btn-default"
                                        defaultValue="Hủy"
                                        onClick={handleCloseModal}
                                    />
                                    <input
                                        type="button"
                                        className="btn btn-success"
                                        defaultValue="Thêm mới"
                                        onClick={handleAdd}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
