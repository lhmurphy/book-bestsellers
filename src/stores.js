import { observable, action, decorate } from "mobx";
class JobsStore {
  jobs = [];
setJobs(jobs) {
    this.jobs = jobs;
  }
}
JobsStore = decorate(JobsStore, {
  jobs: observable,
  setJobs: action,
});
export { JobsStore };