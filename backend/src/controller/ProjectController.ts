/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  JsonController, Param, Body, Get, Post,
} from 'routing-controllers';
import Project from '../entity/Project';
import ProjectService from '../service/ProjectService';

@JsonController('/projects')
export default class ProjectController {
  // 依赖注入
  // eslint-disable-next-line no-useless-constructor
  constructor(private projectService: ProjectService) {}

  @Get('/')
  getProjects() {
    return this.projectService.getProjects();
  }

  @Get('/:id')
  getProject(@Param('id') id: string) {
    return this.projectService.getProject(id);
  }

  @Post('/add')
  addProject(@Body() project: Project) {
    return this.projectService.addProject(project);
  }

  @Post('/update/:id')
  updatePage(@Param('id') id: string, @Body() project: Project) {
    return this.projectService.updateProject(id, project);
  }
}
