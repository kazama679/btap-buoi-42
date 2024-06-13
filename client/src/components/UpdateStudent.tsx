import React, { useState } from 'react';
import axios from 'axios';

interface UpdateStudentProps {
    studentId: number; 
    handleCloseModal: () => void;
    refreshStudents: () => void;
}

export default function UpdateStudent({ studentId, handleCloseModal, refreshStudents }: UpdateStudentProps) {
    const [studentInfo, setStudentInfo] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setStudentInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/student/${studentId}`, studentInfo)
            .then((response) => { 
                console.log('Response:', response.data); 
                handleCloseModal(); 
                refreshStudents(); 
            })
            .catch((error) => {
                console.error('Error updating student:', error);
            });

    };

    return (
        <div id="editEmployeeModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h4 className="modal-title">Sửa thông tin sinh viên</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-hidden="true"
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
                                    name="name"
                                    value={studentInfo.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={studentInfo.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Địa chỉ</label>
                                <textarea
                                    className="form-control"
                                    name="address"
                                    value={studentInfo.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Số điện thoại</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={studentInfo.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <input
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal"
                                defaultValue="Thoát"
                            />
                            <input type="submit" className="btn btn-info" defaultValue="Lưu" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}