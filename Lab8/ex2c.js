var age = 27;
var counters = 0;
// repeat until counters equals age 
while (counters != age) {
    counters++
    if (counters > age/2) {
        console.log("Don't ask how old I am!"); 
        process.exit(0);
    }
    console.log("counter; " + counters);
}