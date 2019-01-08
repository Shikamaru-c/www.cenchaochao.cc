function runTasks (tasks) {
  return tasks.reduceRight((a, b) => {
    return () => b.call(null, a)
  })
}

module.exports = {
  runTasks
}