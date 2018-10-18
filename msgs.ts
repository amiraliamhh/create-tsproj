export function loader(text: string) {
  var P = ["\\", "|", "/", "-"];
  var x = 0;
  console.log('\r ' + text + ' ');
  return setInterval(function() {
    process.stdout.write(P[x++] + '\r');
    x &= 3;
  }, 250);
}