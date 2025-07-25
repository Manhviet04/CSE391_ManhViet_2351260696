let studentCount = 0; // Đếm số sinh viên hiện tại
let selectedRow = null; // Biến để ghi nhớ dòng đang được sửa

// Tiết 4: Xóa dòng - xử lý DOM động
function xoaDong(btn) {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
        btn.parentElement.parentElement.remove();
        thongBao("Xóa thành công!");
    }
}

// Tiết 5: Xác thực đầu vào (Validation)
function kiemTraValidation() {
    const ten = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const maSV = document.getElementById("studentId").value.trim();
    
    if (ten === "") {
        alert("Tên không được để trống");
        return false;
    }
    
    let regexEmail = /^\S+@\S+\.\S+$/;
    if (!regexEmail.test(email)) {
        alert("Email không hợp lệ");
        return false;
    }
    
    if (maSV === "") {
        alert("Mã sinh viên không được để trống");
        return false;
    }
    
    return true;
}

// Tiết 6: Chỉnh sửa dòng - Giao diện cập nhật
function suaDong(btn) {
    selectedRow = btn.parentElement.parentElement;
    
    const maSV = selectedRow.cells[1].innerText;
    const hoTen = selectedRow.cells[2].innerText;
    const email = selectedRow.cells[3].innerText;
    const gioiTinh = selectedRow.cells[4].innerText;
    const ngaySinh = selectedRow.cells[5].innerText;
    
    document.getElementById("studentId").value = maSV;
    document.getElementById("fullName").value = hoTen;
    document.getElementById("email").value = email;
    
    if (gioiTinh === "Nam") {
        document.getElementById("male").checked = true;
    } else if (gioiTinh === "Nữ") {
        document.getElementById("female").checked = true;
    } else {
        document.getElementById("other").checked = true;
    }
    
    if (ngaySinh && ngaySinh !== "") {
        const parts = ngaySinh.split("/");
        if (parts.length === 3) {
            const formattedDate = parts[2] + "-" + parts[1].padStart(2, '0') + "-" + parts[0].padStart(2, '0');
            document.getElementById("birthDate").value = formattedDate;
        }
    }
    
    document.getElementById("btnThem").innerText = "Cập nhật";
    thongBao("Dữ liệu đã được nạp lên form để chỉnh sửa");
}

function capNhatSinhVien() {
    if (selectedRow) {
        selectedRow.cells[1].innerText = document.getElementById("studentId").value;
        selectedRow.cells[2].innerText = document.getElementById("fullName").value;
        selectedRow.cells[3].innerText = document.getElementById("email").value;
        
        const genderRadio = document.querySelector("input[name='gender']:checked");
        selectedRow.cells[4].innerText = genderRadio ? genderRadio.value : "";
        
        const birthDate = document.getElementById("birthDate").value;
        if (birthDate) {
            const parts = birthDate.split("-");
            selectedRow.cells[5].innerText = parts[2] + "/" + parts[1] + "/" + parts[0];
        } else {
            selectedRow.cells[5].innerText = "";
        }
        
        thongBao("Cập nhật thành công!");
        selectedRow = null;
        
        document.getElementById("studentForm").reset();
        document.getElementById("btnThem").innerText = "Thêm sinh viên";
    }
}

// Hàm hiển thị thông báo
function thongBao(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.innerText = message;
    messageDiv.style.display = "block";
    
    setTimeout(() => {
        messageDiv.style.display = "none";
        messageDiv.innerText = "";
    }, 3000);
}

// Gắn sự kiện onclick cho nút "Thêm sinh viên"
document.getElementById("btnThem").addEventListener("click", function(e) {
    e.preventDefault();
    
    if (!kiemTraValidation()) {
        return;
    }
    
    if (selectedRow) {
        capNhatSinhVien();
        return;
    }
    
    const studentId = document.getElementById("studentId").value;
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const birthDate = document.getElementById("birthDate").value;
    const gender = document.querySelector("input[name='gender']:checked");
    const notes = document.getElementById("notes").value;

    studentCount++;
    const tableBody = document.getElementById("studentTableBody");
    const newRow = tableBody.insertRow();

    newRow.insertCell(0).innerText = studentCount; // STT
    newRow.insertCell(1).innerText = studentId; // Mã SV
    newRow.insertCell(2).innerText = fullName; // Họ tên
    newRow.insertCell(3).innerText = email; // Email
    newRow.insertCell(4).innerText = gender ? gender.value : ""; // Giới tính
    
    let formattedDate = "";
    if (birthDate) {
        const parts = birthDate.split("-");
        formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
    }
    newRow.insertCell(5).innerText = formattedDate; // Ngày sinh

    const actionsCell = newRow.insertCell(6);
    actionsCell.innerHTML = `
        <button class="action-link" onclick="suaDong(this)">Sửa</button>
        <button class="action-link delete" onclick="xoaDong(this)">Xóa</button>
    `;

    thongBao("Thêm sinh viên thành công!");
    document.getElementById("studentForm").reset();
});

// Real-time validation
document.getElementById("studentId").addEventListener("blur", function() {
    if (!this.value.trim()) {
        document.getElementById("studentIdError").style.display = "block";
    } else {
        document.getElementById("studentIdError").style.display = "none";
    }
});

document.getElementById("fullName").addEventListener("blur", function()
