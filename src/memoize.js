module.exports = (target, fn) => {
    const cache = {}
    return field => 
       field in cache ? cache[field] : (cache[field] = fn(target, field))
}