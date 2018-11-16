function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function(...args) {
    console.log(`%c Calling ${name} with`, "color:red;font-size:20px", args);
    return oldValue.apply(this, args);
  };

  return descriptor;
}

export default log;
