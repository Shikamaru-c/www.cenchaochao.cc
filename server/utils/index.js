function runTasks (tasks) {
  return tasks.reduceRight((a, b) => {
    return b.bind(null, a)
  })
}

module.exports = {
  runTasks
}