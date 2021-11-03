/*
 * @Author: your name
 * @Date: 2021-06-15 20:23:19
 * @LastEditTime: 2021-11-02 14:19:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue2-webgis-template/src/router/index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("@/views/Index"),
      }
    ]
  },
  {
    path: '/demoYinChuan',
    component: Layout,
    redirect: "/yinchuan",
    children: [
      {
        path: "/yinchuan",
        name: "yinchuan",
        component: () => import("@/views/demoyinchuan/Index"),
      }
    ]
  },
  {
    path: '/demoTFProjectShow',
    component: Layout,
    redirect: "/TFProjectShow",
    children: [
      {
        path: "/TFProjectShow",
        name: "TFProjectShow",
        component: () => import("@/views/demotfprojectshow/Index"),
      }
    ]
  },
  {
    path: '/login',
    component: Layout,
    redirect: "/LoginVehicle",
    children: [
      {
        path: "/LoginVehicle",
        name: "LoginVehicle",
        component: () => import("@/views/vehicle/Login/login"),
      }
    ]
  },
  {
    path: '/vehicle',
    component: Layout,
    redirect: '/vehicleMonitor',
    children: [

      // 车辆监控
      {
        path: '/vehicleMonitor',
        name: 'vehicleMonitor',
        component: () => import('@/views/vehicle/vehicleMonitor')
      },
      // 统计分析
      {
        path: '/vehicleAnalysis',
        name: 'vehicleAnalysis',
        component: () => import('@/views/vehicle/vehicleAnalysis')
      }
    ]
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
