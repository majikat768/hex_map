let n_node_selector = document.getElementById("n_nodes_select");

for(let i = 1; i <= 64; i += 1) {
    let opt = document.createElement("option");
    opt.value = i;
    opt.text = i;
    n_node_selector.appendChild(opt);
}

n_node_selector.selectedIndex = 23;

/*
let n_size_selector = document.getElementById("n_size_select");

for(let i = 8; i <= 64; i += 8) {
    let opt = document.createElement("option");
    opt.value = i;
    opt.text = i;
    n_size_selector.appendChild(opt);
}

n_size_selector.selectedIndex = 2;
*/

let n_cols_selector = document.getElementById("n_cols_select");

for(let i = 16; i <= 64; i += 8) {
    let opt = document.createElement("option");
    opt.value = i;
    opt.text = i;
    n_cols_selector.appendChild(opt);
}
n_cols_selector.selectedIndex = 5;

let n_rows_selector = document.getElementById("n_rows_select");

for(let i = 16; i <= 64; i += 8) {
    let opt = document.createElement("option");
    opt.value = i;
    opt.text = i;
    n_rows_selector.appendChild(opt);
}

n_rows_selector.selectedIndex = 4;

let node_opacity = document.getElementById("node_opacity");

for(let i = 0; i <= 100; i += 10) {
    let opt = document.createElement("option");
    opt.value = i;
    opt.text = i + "%";
    node_opacity.appendChild(opt);
}

node_opacity.selectedIndex = 6;
