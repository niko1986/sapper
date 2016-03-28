function Minesweeper() {
    var main = this;

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function pushMine(e, l) {
        if (arrMine[main.thisNumber] > -3) {
            if (main.thisNumber + 1 > l) main.thisNumber = 1;
            if (main.thisNumber + 1 == e) {
                return;
            } else {
                main.thisNumber++;
                pushMine(e, l);
            }
        } else {
            return;
        }
    }

    function Timer() {
        if (time > 99) {
            document.getElementById('time').innerHTML = time;
        }
        if (time < 10) {
            document.getElementById('time').innerHTML = '00' + time;
        }
        if ((time > 9) && (time < 100)) {
            document.getElementById('time').innerHTML = '0' + time;
        }
        time++;
        setTimeout(function () {
            if (start) {
                Timer();
            }
        }, 1000);
    }

    function addNumberMine(i) {
        var t1 = i - main.col - 1;
        var t2 = i - main.col;
        var t3 = i - main.col + 1;
        var t4 = i + 1;
        var t5 = i + main.col + 1;
        var t6 = i + main.col;
        var t7 = i + main.col - 1;
        var t8 = i - 1;
        if ((t1 > 0) && (t1 <= main.col * main.row) && (arrMine[t1] !== -1) && (i % main.col != 1)) {
            arrMine[t1] = arrMine[t1] ? arrMine[t1] + 1 : 1;
        }
        if ((t2 > 0) && (t2 <= main.col * main.row) && (arrMine[t2] !== -1)) {
            arrMine[t2] = arrMine[t2] ? arrMine[t2] + 1 : 1;
        }
        if ((t3 > 0) && (t3 <= main.col * main.row) && (arrMine[t3] !== -1) && (i % main.col != 0)) {
            arrMine[t3] = arrMine[t3] ? arrMine[t3] + 1 : 1;
        }
        if ((t4 > 0) && (t4 <= main.col * main.row) && (arrMine[t4] !== -1) && (i % main.col != 0)) {
            arrMine[t4] = arrMine[t4] ? arrMine[t4] + 1 : 1;
        }
        if ((t5 > 0) && (t5 <= main.col * main.row) && (arrMine[t5] !== -1) && (i % main.col != 0)) {
            arrMine[t5] = arrMine[t5] ? arrMine[t5] + 1 : 1;
        }
        if ((t6 > 0) && (t6 <= main.col * main.row) && (arrMine[t6] !== -1)) {
            arrMine[t6] = arrMine[t6] ? arrMine[t6] + 1 : 1;
        }
        if ((t7 > 0) && (t7 <= main.col * main.row) && (arrMine[t7] !== -1) && (i % main.col != 1)) {
            arrMine[t7] = arrMine[t7] ? arrMine[t7] + 1 : 1;
            ;
        }
        if ((t8 > 0) && (t8 <= main.col * main.row) && (arrMine[t8] !== -1) && (i % main.col != 1)) {
            arrMine[t8] = arrMine[t8] ? arrMine[t8] + 1 : 1;
        }
    }

    function initFields() {
        var number = 1;
        var count = main.col * main.row;
        for (var i = 1; i <= main.mine; i++) {
            number = random(1, count);
            main.thisNumber = number;
            pushMine(number, count);
            arrMine[main.thisNumber] = -1;
            addNumberMine(main.thisNumber);
        }
    }

    function openMine(number) {
        for (var i = 1; i <= arrMine.length; i++) {
            if (arrMine[i] == -1) {
                document.getElementById('field' + i).className = "mineyes";
            }
        }
        if (number > 0) {
            var el = document.createElement('span');
            document.getElementById('field' + number).appendChild(el);
            var el = document.createElement('b');
            document.getElementById('field' + number).appendChild(el);
        }
    }

    function lClickField(e) {
        if ((!start) && (game)) {
            start = true;
            Timer();
        }
        if (!game) return;
        if (this.className == 'minehel')return;
        var number = this.getAttribute('data-id');
        number = parseInt(number);
        if ((arrMine[number] != -1) && (!arrOpen[number])) {
            openNull(number);
            if ((main.col * main.row) - open == main.mine) {
                start = false;
                game = false;
                openMine(0);
            }
        }
        if (arrMine[number] == -1) {
            start = false;
            game = false;
            document.getElementsByClassName('smile')[0].className = 'smile gameOver';
            openMine(number);
        }
    }

    function textMine(countMine) {
        if (countMine < 0) countMine = 0;
        countMine += '';
        if (countMine.length > 2) {
            document.getElementById('mine').innerHTML = countMine;
        }
        if (countMine.length == 1) {
            document.getElementById('mine').innerHTML = '00' + countMine;
        }
        if (countMine.length == 2) {
            document.getElementById('mine').innerHTML = '0' + countMine;
        }
    }

    function rClickField(e) {
        e.preventDefault();
        if ((!start) && (game)) {
            start = true;
            Timer();
        }
        if (!game) return;
        if (this.className == 'minehel') {
            this.className = '';
            minehelp++;
        } else {
            if (this.className == '') {
                this.className = 'minehel';
                minehelp--;
            }
        }
        textMine(minehelp);
        return false;
    }

    function openNull(i) {
        var elem = document.getElementById('field' + i);
        if (elem.className == 'minehel') return;
        if (isNaN(arrMine[i])) {
            elem.className = 'active';
            arrOpen[i] = true;
            open++;
            var t1 = i - main.col - 1;
            var t2 = i - main.col;
            var t3 = i - main.col + 1;
            var t4 = i + 1;
            var t5 = i + main.col + 1;
            var t6 = i + main.col;
            var t7 = i + main.col - 1;
            var t8 = i - 1;
            if ((t1 > 0) && (t1 <= main.col * main.row) && (i % main.col != 1) && (!arrOpen[t1])) {
                openNull(t1);
            }
            if ((t2 > 0) && (t2 <= main.col * main.row) && (!arrOpen[t2])) {
                openNull(t2);
            }
            if ((t3 > 0) && (t3 <= main.col * main.row) && (i % main.col != 0) && (!arrOpen[t3])) {
                openNull(t3);
            }
            if ((t4 > 0) && (t4 <= main.col * main.row) && (i % main.col != 0) && (!arrOpen[t4])) {
                openNull(t4);
            }
            if ((t5 > 0) && (t5 <= main.col * main.row) && (i % main.col != 0) && (!arrOpen[t5])) {
                openNull(t5);
            }
            if ((t6 > 0) && (t6 <= main.col * main.row) && (!arrOpen[t6])) {
                openNull(t6);
            }
            if ((t7 > 0) && (t7 <= main.col * main.row) && (i % main.col != 1) && (!arrOpen[t7])) {
                openNull(t7);
            }
            if ((t8 > 0) && (t8 <= main.col * main.row) && (i % main.col != 1) && (!arrOpen[t8])) {
                openNull(t8);
            }
        } else {
            elem.className = 'active color' + arrMine[i];
            elem.innerHTML = '' + arrMine[i];
            arrOpen[i] = true;
            open++;
        }
    }

    main.col = 9;
    main.row = 9;
    main.mine = 10;
    main.thisNumber = 1;
    var arrMine = [];
    var arrOpen = [];
    var open = 0;
    var minehelp = 0;
    var start = false;
    var time = 0;
    var game = true;

    main.newMini = function () {
        sapper.className = 'main';
        fields.innerHTML = '';
        Mines.col = 9;
        Mines.row = 9;
        Mines.mine = 10;
        document.getElementsByClassName('smile')[0].className = 'smile';
        Mines.init();
    }
    main.newMax = function () {
        sapper.className = 'main maxfield';
        fields.innerHTML = '';
        document.getElementsByClassName('smile')[0].className = 'smile';
        Mines.col = 30;
        Mines.row = 16;
        Mines.mine = 60;
        Mines.init();
    }
    main.newStandart = function () {
        sapper.className = 'main standartfield';
        fields.innerHTML = '';
        document.getElementsByClassName('smile')[0].className = 'smile';
        Mines.col = 13;
        Mines.row = 16;
        Mines.mine = 25;
        Mines.init();
    }
    main.init = function () {
        var newDiv = {};
        arrMine = [];
        arrOpen = [];
        open = 0;
        time = 0;
        game = true;
        start = false;
        var n = 1;
        minehelp = main.mine;
        initFields();
        textMine(main.mine);
        for (var i = 1; i <= main.row; i++) {
            for (var j = 1; j <= main.col; j++) {
                newDiv[n] = document.createElement('div');
                newDiv[n].setAttribute('data-id', n);
                newDiv[n].setAttribute('id', 'field' + n);
                newDiv[n].addEventListener('click', lClickField);
                newDiv[n].addEventListener('contextmenu', rClickField);
                fields.appendChild(newDiv[n]);
                n++;
            }
        }
    }
}