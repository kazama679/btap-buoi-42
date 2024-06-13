import React from 'react';
import axios from 'axios';

interface DeleteStudentProps {
    onDelete: boolean;
    handleCloseModal: () => void;
    studentId: number;
    refreshStudents: () => void;
}
export default function DeleteStudent({ onDelete, handleCloseModal, studentId, refreshStudents }: DeleteStudentProps) {
    const handleDelete = () => {
        axios.delete(`http://localhost:8080/student/${studentId}`)
            .then(() => {
                refreshStudents();
                handleCloseModal();
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            {onDelete && (
                <div id="deleteEmployeeModal" className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form>
                                <div className="modal-header">
                                    <h4 className="modal-title">Xóa nhân viên</h4>
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
                                    <p>Bạn chắc chắn muốn xóa sinh viên với ID {studentId}?</p>
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
                                        className="btn btn-danger"
                                        defaultValue="Xóa"
                                        onClick={handleDelete}
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
