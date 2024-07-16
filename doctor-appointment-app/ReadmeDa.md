-- Tạo user mới với mật khẩu
CREATE USER 'duyanhnew2'@'%' IDENTIFIED WITH mysql_native_password BY '123456';

-- Cấp quyền truy cập tất cả các cơ sở dữ liệu
GRANT ALL PRIVILEGES ON _._ TO 'duyanhnew2'@'%' WITH GRANT OPTION;

-- Làm mới bảng quyền để áp dụng các thay đổi
FLUSH PRIVILEGES;
