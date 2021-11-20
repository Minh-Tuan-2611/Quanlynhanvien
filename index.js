var listStaffs = JSON.parse(localStorage.getItem('listStaff'));
if (listStaffs == null) {
    listStaffs = [];
}

function taoId() {
    var id = Math.random().toString().substr(2, 10) + '_' + String(new Date().getTime());
    return id;
}

var creatBtn = document.getElementById('create');

function staffItem(id, name, age, salary, position) {
    this.name = name;
    this.age = age;
    this.salary = salary;
    this.position = position;
    if (id == null) {
        this.id = taoId();
    } else {
        this.id = id;
    }
}

function renderStaff() {
    var listStaffs = JSON.parse(localStorage.getItem('listStaff'));
    if (listStaffs == null) {
        listStaffs = [];
    }
    var y = listStaffs.map(function(staff, index) {
        return `<ul>Nhân viên ${index+1}
                    <li>Tên nhân viên: ${staff.name}</li>
                    <li>Tuổi nhân viên: ${staff.age}</li>
                    <li>Mức lương nhân viên: ${staff.salary}</li>
                    <li>Chức vụ nhân viên: ${staff.position}</li>
                </ul>
                <button onclick="deleteStaff('${staff.id}')" class="btn-change">Xóa nhân viên</button>
                <button onclick="updateStaff('${staff.id}')" class="btn-change">Sửa nhân viên</button>
                `
    })
    var z = y.join(' ');
    // document.querySelector('.staff-list').innerHTML = '';
    document.querySelector('.staff-list').innerHTML = z;
}

renderStaff();

creatBtn.onclick = function() {
    var name = document.querySelector('input[name="name"]').value;
    var age = document.querySelector('input[name="age"]').value;
    var salary = document.querySelector('input[name="salary"]').value;
    var position = document.querySelector('input[name="position"]').value;
    var error_msg = document.querySelectorAll('.msg-error');
    for (var i = 0; i < error_msg.length; i++) {
        error_msg[i].innerHTML = ''
    }
    document.querySelector('input[name="name"]').classList.remove('input-error');
    document.querySelector('input[name="age"]').classList.remove('input-error');
    document.querySelector('input[name="salary"]').classList.remove('input-error');
    document.querySelector('input[name="position"]').classList.remove('input-error');
    if (name.trim() == '') {
        document.querySelector('input[name="name"]').classList.add('input-error');
        error_msg[0].innerHTML = 'Vui lòng nhập trường này';
    }
    if (age.trim() == '') {
        document.querySelector('input[name="age"]').classList.add('input-error');
        error_msg[1].innerHTML = 'Vui lòng nhập trường này';
    }
    if (salary.trim() == '') {
        document.querySelector('input[name="salary"]').classList.add('input-error');
        error_msg[2].innerHTML = 'Vui lòng nhập trường này';
    }
    if (position.trim() == '') {
        document.querySelector('input[name="position"]').classList.add('input-error');
        error_msg[3].innerHTML = 'Vui lòng nhập trường này';
    }
    if (name.trim() != '' && age.trim() != '' && salary.trim() != '' && position.trim() != '') {
        var staff = new staffItem(null, name, age, salary, position);
        listStaffs.push(staff);
        var json = JSON.stringify(listStaffs);
        localStorage.setItem('listStaff', json);
        var name = document.querySelector('input[name="name"]').value = '';
        var age = document.querySelector('input[name="age"]').value = '';
        var salary = document.querySelector('input[name="salary"]').value = '';
        var position = document.querySelector('input[name="position"]').value = '';
        renderStaff();
    }
};

function deleteStaff(id) {
    var listStaffs = JSON.parse(localStorage.getItem('listStaff'));
    for (var i = 0; i < listStaffs.length; i++) {
        if (listStaffs[i].id == id) {
            listStaffs.splice(i, 1);
            localStorage.setItem('listStaff', JSON.stringify(listStaffs));
            renderStaff();
        }
    }
}

function updateStaff(id) {
    creatBtn.innerHTML = 'Update'
    var listStaffs = JSON.parse(localStorage.getItem('listStaff'));
    for (var i = 0; i < listStaffs.length; i++) {
        if (listStaffs[i].id === id) {
            var thisStaff = listStaffs[i];
        }
    }
    var name = document.querySelector('input[name="name"]');
    var age = document.querySelector('input[name="age"]');
    var salary = document.querySelector('input[name="salary"]');
    var position = document.querySelector('input[name="position"]');
    name.value = thisStaff.name;
    age.value = thisStaff.age;
    salary.value = thisStaff.salary;
    position.value = thisStaff.position;
    creatBtn.onclick = function() {
        var newName = name.value;
        var newAge = age.value;
        var newSalary = salary.value;
        var newPosition = position.value;
        thisStaff.name = newName;
        thisStaff.age = newAge;
        thisStaff.salary = newSalary;
        thisStaff.position = newPosition;
        localStorage.setItem('listStaff', JSON.stringify(listStaffs));
        renderStaff();
        name.value = '';
        age.value = '';
        salary.value = '';
        position.value = '';
        creatBtn.innerHTML = 'Thêm nhân viên';
        creatBtn.onclick = function() {
            var name = document.querySelector('input[name="name"]').value;
            var age = document.querySelector('input[name="age"]').value;
            var salary = document.querySelector('input[name="salary"]').value;
            var position = document.querySelector('input[name="position"]').value;
            if (name.trim() != '' && age.trim() != '' && salary.trim() != '' && position.trim() != '') {
                var staff = new staffItem(null, name, age, salary, position);
                listStaffs.push(staff);
                var json = JSON.stringify(listStaffs);
                localStorage.setItem('listStaff', json);
                var name = document.querySelector('input[name="name"]').value = '';
                var age = document.querySelector('input[name="age"]').value = '';
                var salary = document.querySelector('input[name="salary"]').value = '';
                var position = document.querySelector('input[name="position"]').value = '';
                renderStaff();
            }
        }
    }
}

// validation form
var input = document.querySelectorAll('input');
var error_msg = document.querySelectorAll('.msg-error');
for (var i = 0; i < input.length; i++) {
    confirm(input[i], error_msg[i]);
}

function confirm(input, error_msg) {
    input.onblur = function() {
        if (input.value.trim() == '') {
            input.classList.add('input-error');
            error_msg.innerHTML = 'Vui lòng nhập trường này';
        }
    }
    input.onmouseout = function() {
        if (input.value.trim() != '') {
            input.classList.remove('input-error');
            error_msg.innerHTML = '';
        }
    }
    input.onmouseover = function() {
        if (input.value.trim() != '') {
            input.classList.remove('input-error');
            error_msg.innerHTML = '';
        }
    }
}