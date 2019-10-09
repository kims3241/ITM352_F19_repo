var age = 27;
var counters = 0;
// repeat until counters equals age 
while (counters != age) {
    counters++
    if (counters > age/2 && counters <(3/4)*age) {
        console.log("No age Zone!"); 
        continue; 
    }
    console.log("counter; " + counters);
}