var age = 27;
var counters = 1;
// repeat until counters equals age 
while (counters != age) {
    if (counters > age/2) {
        console.log("I'm old!");
        break;
    }
    console.log("counter; " + counters);
     counters++
}
