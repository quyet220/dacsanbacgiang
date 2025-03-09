document.addEventListener("DOMContentLoaded", function () {
    const authForm = document.getElementById("auth-form");
    const registerBtn = document.getElementById("register-btn");

    // Xử lý đăng nhập
    authForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value;
        let storedPassword = localStorage.getItem(`user_${username}`);

        if (storedPassword && storedPassword === password) {
            localStorage.setItem("loggedInUser", username);
            window.location.href = "index1.html"; // Chuyển hướng về index1.html sau khi đăng nhập thành công
        } else {
            document.getElementById("message").textContent = "Sai tài khoản hoặc mật khẩu!";
        }
    });

    // Xử lý đăng ký
    registerBtn.addEventListener("click", function () {
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value;

        if (!username || !password) {
            document.getElementById("message").textContent = "Vui lòng nhập đầy đủ thông tin!";
            return;
        }

        if (localStorage.getItem(`user_${username}`)) {
            document.getElementById("message").textContent = "Tài khoản đã tồn tại!";
        } else {
            localStorage.setItem(`user_${username}`, password);
            document.getElementById("message").textContent = "Đăng ký thành công! Hãy đăng nhập.";
        }
    });

    // Kiểm tra nếu đã đăng nhập
    if (localStorage.getItem("loggedInUser")) {
        document.getElementById("message").textContent = "Bạn đã đăng nhập!";
    }
});

// Kiểm tra đăng nhập trước khi vào trang web
function checkLogin() {
    if (!localStorage.getItem("loggedInUser")) {
        alert("Bạn cần đăng nhập để truy cập!");
        window.location.href = "login.html";
    }
}

// Đăng xuất
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            window.location.href = "login.html";
        });
    }
});
function saveOrder(items, total) {
    let username = localStorage.getItem("loggedInUser");
    if (!username) {
        alert("Bạn cần đăng nhập để đặt hàng!");
        window.location.href = "login.html";
        return;
    }

    let orders = JSON.parse(localStorage.getItem(`orders_${username}`)) || [];

    let newOrder = {
        date: new Date().toLocaleString(), // Lấy thời gian đặt hàng
        items: items,
        total: total
    };

    orders.push(newOrder);
    localStorage.setItem(`orders_${username}`, JSON.stringify(orders));

    alert("Đơn hàng đã được lưu!");
}
