let cols = 64;
let rows = 48;

let cell_size = 16;
let node_size = cell_size/1.5;
let side_length = ((cell_size/2) / (Math.sin(60 * Math.PI/180)))

let odd_offset = cell_size / 2;

let bg_col = [11,255];

let W = cols * cell_size + cell_size*2;
let H = rows * side_length * 1.66; 

let grid; 

let n_nodes = 24;
let nodes;

let directions = [
    {x:1,y:0},
    {x:-1,y:0},
    {x:0,y:1},
    {x:0,y:-1}//,
    //{x:-1,y:-1},
    //{x:-1,y:1}
]

let canvas;

function setup() {
    canvas = createCanvas(W,H);
    canvas.parent("canvas-container");
    background(bg_col);
    grid = init_grid();
    nodes = init_nodes();
}

function init_nodes() {
    let nodes = [];
    for(let i = 0; i < n_nodes; i += 1) {
        let x = floor(random(0,cols));
        let y = floor(random(0,rows));
        nodes.push(new Node(x,y));
    }
    return nodes;
}

function init_grid() {
    let grid = new Array(cols);
    for(let i = 0; i < cols; i += 1) {
        grid[i] = new Array(rows);
        for(let j = 0; j < rows; j += 1) {
            grid[i][j] = new Cell(i,j);
        }
    }
    return grid;
}

function draw() {
    //frameRate(30);
    translate(cell_size/1,cell_size/1);
    //background(bg_col,18);
    //draw_grid();
    let done = true;
    for(n of nodes) {
        if(!n.done) {
            done = false;
            n.update();
        }
    }

    if(done) {
        noLoop();
    }
}

function reset() {
    n_nodes = document.getElementById("n_nodes_select").value;
    cols = document.getElementById("n_cols_select").value;
    rows = document.getElementById("n_rows_select").value;
    //cell_size = document.getElementById("n_size_select").value;
    side_length = ((cell_size/2) / (Math.sin(60 * Math.PI/180)))
    //node_size = cell_size/3;
    odd_offset = cell_size / 2;
    W = cols * cell_size + cell_size*2;
    H = rows * cell_size; 
    grid = init_grid();
    nodes = init_nodes();
    //bg_col = [21,document.getElementById("node_opacity").value / 100 * 255]
    background(11);
    loop();

}
function draw_grid() {
    stroke(200);
    strokeWeight(1);
    for(let i = 0; i < cols; i += 1) {
        for(let j = 0; j < rows; j += 1) {
            grid[i][j].draw_cell();
        }
    }
}

function Cell(x,y) {
    this.coordinates = createVector(x,y);
    this.center = createVector(x * cell_size + (y % 2 == 0 ? 0 : odd_offset),y * 3 * side_length/2);
    this.visits = 1;// + (random() < 0.3 ? 1 : 0);

    this.find_vertices = function() {
        let vertices = [];
        for(let theta = 0; theta < 360; theta += 60) {
            let x = this.center.x + (side_length) * Math.sin(theta * Math.PI/180);
            let y = this.center.y + (side_length) * Math.cos(theta * Math.PI/180);
            vertices.push(createVector(x,y));
        }

        return vertices;
    }
    this.vertices = this.find_vertices();

    this.draw_cell = function() {
        //circle(this.center.x,this.center.y,2);
        noFill();
        beginShape();
        for(v of this.vertices) {
            vertex(v.x, v.y);
        }
        endShape(CLOSE);
    }
}

function Node(x,y) {
    this.current_cell = grid[x][y];
    this.current_cell.visits -= 1;
    this.start_cell = grid[x][y];

    this.col = [
        floor(random(10,255)),
        floor(random(10,255)),
        floor(random(10,255)),
        255
        //document.getElementById("node_opacity").value / 100 * 255
    ]

    this.path = [];

    this.update = function() {
        let options = [];
        this.done = false;
        let x = this.current_cell.coordinates.x;
        let y = this.current_cell.coordinates.y;

        for(let dir of directions) {
            if(
                x + dir.x < cols &&
                x + dir.x >= 0 &&
                y + dir.y < rows &&
                y + dir.y >= 0 &&
                grid[x + dir.x][y + dir.y].visits > 0
                ) {
                    options.push(dir);
                }
        }

        if(options.length > 0) {
            stroke(this.col);
            strokeWeight(node_size);
            //circle(this.current_cell.center.x,this.current_cell.center.y,node_size/3);
            step = random(options);
            grid[x+step.x][y+step.y].visits -= 1;
            beginShape();
            vertex(this.current_cell.center.x,this.current_cell.center.y);
            this.path.push(this.current_cell);
            this.current_cell = grid[x + step.x][y + step.y]
            vertex(this.current_cell.center.x,this.current_cell.center.y);
            endShape();
            stroke(255,document.getElementById("node_opacity").value / 100 * 255)
            //circle(this.current_cell.center.x,this.current_cell.center.y,node_size/4);
        }
        else if(this.path.length > 0) {
            stroke(this.col);
            //circle(this.current_cell.center.x,this.current_cell.center.y,node_size/3);
            this.current_cell = this.path.pop();
            stroke(255,document.getElementById("node_opacity").value / 100 * 255)
            //circle(this.current_cell.center.x,this.current_cell.center.y,node_size/4);
        }

        if(this.current_cell.center.x === this.start_cell.center.x && this.current_cell.center.y === this.start_cell.center.y && this.current_cell.visits <= 0) {
            this.done = true;
            console.log('done');
            stroke(this.col);
            //circle(this.current_cell.center.x,this.current_cell.center.y,node_size/3);
        }
    }

}
