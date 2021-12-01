var nodos = new vis.DataSet([
	{id:1, label: "q1",color:{background: "#D8D3DA"}},
	{id:2, label: "q2",color:{background: "#D8D3DA"}},
	{id:3, label: "q3",borderWidth:"3",color:{background: "#D8D3DA"}},
]);

var aristas = new vis.DataSet([

	{id:1, 	from:1, to:1, label: "(a,a,R)", selfReferenceSize:20,color:{color: "#A8A1A9"}},
	{id:2, 	from:1, to:1, label: "(b,a,R)",selfReferenceSize:40,color:{color: "#A8A1A9"}},
	{id:3, 	from:1, to:1, label: "(' ',' ',R)",selfReferenceSize:60,color:{color: "#A8A1A9"}},
	{id:4, 	from:1, to:2, label: "(#,#,L)",color:{color: "#A8A1A9"}},
	{id:5, 	from:2, to:2, label: "(a,a,L)",selfReferenceSize:30,color:{color: "#A8A1A9"}},
	{id:6, 	from:2, to:2, label: "(' ',' ',L)",selfReferenceSize:50,color:{color: "#A8A1A9"}},
	{id:7, 	from:2, to:3, label: "(#,#,R)"},
])

var contenedor = document.getElementById('automata');

var datos = {
	nodes: nodos,
	edges: aristas
};

var opciones = {
	edges:{
		arrows:{
			to:{
				enabled:true
			}
		}
	}
};

var grafo = new vis.Network(contenedor,datos,opciones);

