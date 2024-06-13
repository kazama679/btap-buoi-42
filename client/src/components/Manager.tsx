import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';
import DeleteStudent from './DeleteStudent';
import AddStudent from './AddStudent';
import UpdateStudent from './UpdateStudent';

interface Student {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    status: boolean;
}

export default function Manager() {
    const [students, setStudents] = useState<Student[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(3); // Change to 3 students per page
    const [onDelete, setOnDelete] = useState(false);
    const [deleteStudentId, setDeleteStudentId] = useState<number | null>(null);
    const [onAdd, setOnAdd] = useState(false);
    const [updateStudentId, setUpdateStudentId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchStudents = () => {
        setLoading(true);
        axios.get('http://localhost:8080/student')
            .then((response) => {
                setStudents(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDeleteClick = (id: number) => {
        setDeleteStudentId(id);
        setOnDelete(true);
    };

    const handleCloseDeleteModal = () => {
        setOnDelete(false);
        setDeleteStudentId(null);
    };

    const handleAddClick = () => {
        setOnAdd(true);
    };

    const handleCloseAddModal = () => {
        setOnAdd(false);
    };

    const handleUpdateClick = (id: number) => {
        setUpdateStudentId(id);
    };

    const handleCloseUpdateModal = () => {
        setUpdateStudentId(null);
    };

    // Pagination handlers
    const totalPages = Math.ceil(students.length / studentsPerPage);
    const handleClickPrevious = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };
    const handleClickNext = () => {
        setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
    };
    const handleClickPageNumber = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

    return (
        <>
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>
                                        Quản lý <b>sinh viên</b>
                                    </h2>
                                </div>
                                <div className="col-sm-6">
                                    <button
                                        className="btn btn-success"
                                        onClick={handleAddClick}
                                    >
                                        <i className="material-icons"></i>
                                        <span>Thêm mới sinh viên</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <span className="custom-checkbox">
                                            <input type="checkbox" id="selectAll" />
                                            <label htmlFor="selectAll" />
                                        </span>
                                    </th>
                                    <th>Tên sinh viên</th>
                                    <th>Email</th>
                                    <th>Địa chỉ</th>
                                    <th>Số điện thoại</th>
                                    <th>Lựa chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentStudents.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <span className="custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    id={`checkbox${item.id}`}
                                                    name="options[]"
                                                    defaultValue={1}
                                                />
                                                <label htmlFor={`checkbox${item.id}`} />
                                            </span>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>(+84) {item.phone}</td>
                                        <td>
                                            <a
                                                href="#editEmployeeModal"
                                                className="edit"
                                                data-toggle="modal"
                                                onClick={() => handleUpdateClick(item.id)} 
                                            >
                                                <i
                                                    className="material-icons"
                                                    data-toggle="tooltip"
                                                    title="Edit"
                                                >
                                                    
                                                </i>
                                            </a>
                                            <a
                                                href="#deleteEmployeeModal"
                                                className="delete"
                                                data-toggle="modal"
                                                onClick={() => handleDeleteClick(item.id)}
                                            >
                                                <i
                                                    className="material-icons"
                                                    data-toggle="tooltip"
                                                    title="Delete"
                                                >
                                                    
                                                </i>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="clearfix">
                            <div className="hint-text">
                                Hiển thị <b>{currentStudents.length}</b> trên <b>{students.length}</b> bản ghi
                            </div>
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <a href="#" onClick={handleClickPrevious}>Trước</a>
                                </li>
                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <a href="#" className="page-link" onClick={() => handleClickPageNumber(index + 1)}>{index + 1}</a>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <a href="#" onClick={handleClickNext}>Sau</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Loading /> 

            {deleteStudentId !== null && (
                <DeleteStudent
                    onDelete={onDelete}
                    handleCloseModal={handleCloseDeleteModal}
                    studentId={deleteStudentId}
                    refreshStudents={fetchStudents} 
                />
            )}

            {updateStudentId !== null && (
                <UpdateStudent
                    studentId={updateStudentId}
                    handleCloseModal={handleCloseUpdateModal}
                    refreshStudents={fetchStudents} 
                />
            )}

            {onAdd && (
                <AddStudent
                    onAdd={onAdd}
                    handleCloseModal={handleCloseAddModal}
                    refreshStudents={fetchStudents} 
                />
            )}
        </>
    );
}
