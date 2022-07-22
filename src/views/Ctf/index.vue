<template>
  <div class="playground" id="ctf"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from "axios";
import { PlaygroundCTF, CTFAssetsLoader, TargetCTF, TeamCTF, random } from './index'

@Component
export default class CTF extends Vue {
    mounted() {
        this.init();
    }
    async init() {
      // 加载场景所需资源
      const assets = await CTFAssetsLoader.load()
      // 加载 队伍 和 靶标 数据
      const [targetData, teamData] = await Promise.all([
        axios.get('/json/targets.json'),
        axios.get('/json/teams.json')
      ])
      // 初始化场景
      const playgroundCTF = new PlaygroundCTF((document.querySelector('#ctf') as HTMLElement), assets)
      // 初始化靶标
      const targets = targetData.data.map((item:any) => {
        // 靶标 3D 模型，从资源文件的建筑物中随机取一个
        const buildingModel = assets.buildings[random(0, assets.buildings.length - 1)]
        // 靶标模型实例
        return new TargetCTF(buildingModel, item.name, item.score)
      })
      // 初始化队伍
      const teams = teamData.data.map((item:any) => {
        // 队伍 3D 模型
        const teamModel = assets.aerobat
        return new TeamCTF(teamModel as any, item.name)
      })
      // 向场景添加队伍和靶标
      playgroundCTF.setTeams(teams)
      playgroundCTF.setTargets(targets)

      // 随机攻击
      function randomAttack() {
        if (!teams.length || !targets.length) return
        // 随机选一个队伍
        const team = teams[random(0, teams.length - 1)]
        // 随机选一个靶标
        const target = targets[random(0, targets.length - 1)]
        // 随机表示是否攻击成功
        const isSuccess = Math.random() > 0.5
        // 开始攻击
        team.toAttack(target, isSuccess)
        // 一直进行模拟攻击
        setTimeout(randomAttack, Math.random() * 10000)
      }
      
      setTimeout(randomAttack, 5000)
    }
}
</script>
