/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getMongoRepository } from 'typeorm';
import Project from '../entity/Project';

export default class ProjectService {
  async getProjects() {
    const projectRepository = getMongoRepository(Project);
    const projects = await projectRepository.find();
    return projects.map((project) => {
      const { id, ...res } = project;
      return res;
    });
  }

  async getProject(projectId: string) {
    const projectRepository = getMongoRepository(Project);
    const project = await projectRepository.findOne({
      projectId,
    });
    if (project) {
      const { id, ...res } = project;
      return res;
    }
    return null;
  }

  async addProject(project: Project) {
    const projectRepository = getMongoRepository(Project);
    const newProject = await projectRepository.save(project);
    // 过滤掉id
    const { id, ...res } = newProject;
    return res;
  }

  async updateProject(id: string, project: Project) {
    console.log('updateProject ', project);
    const projectRepository = getMongoRepository(Project);
    const res = await projectRepository.update({ projectId: id }, project);
    return res;
  }
}
