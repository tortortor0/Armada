const express = require('express');
const prometheusController = require('../controllers/prometheusController');
const metricsDataController = require('../controllers/metricsDataController');
const prometheusRouter = express.Router();

// route to deploy prometheus onto the Cluster
prometheusRouter.post('/install', (req, res) => {
  res.status(200).json('Prometheus Fired Up');
});

// trial route to get data from prometheus after nodeporting
prometheusRouter.get('/up', prometheusController.isUp, (req, res) => {
  res.status(200).json(res.locals.query);
});

prometheusRouter.get(
  '/port',
  prometheusController.portPrometheus,
  (req, res) => {
    res.status(200).send('port on');
  }
);

prometheusRouter.get(
  '/homepage',
  prometheusController.bytesTransmittedPerNode,
  prometheusController.bytesReceivedPerNode,
  (req, res) => {
    const chartData = {
      bytesTransmittedPerNode: res.locals.bytesTransmittedPerNode,
      bytesReceivedPerNode: res.locals.bytesReceivedPerNode,
    };
    res.status(200).json(chartData);
  }
);

prometheusRouter.get(
  '/metricspage',
  metricsDataController.getCPUUsageByNamespace,
  metricsDataController.getCPUUsageByPod,
  metricsDataController.getCPUUsageByNode,
  metricsDataController.getMemoryUsageByNamespace,
  metricsDataController.getMemoryUsageByNode,
  metricsDataController.getMemoryUsageByPod,
  metricsDataController.bytesTransmittedPerNamespace,
  metricsDataController.bytesTransmittedPerNode,
  metricsDataController.bytesTransmittedPerPod,
  metricsDataController.bytesReceivedPerNamespace,
  metricsDataController.bytesReceivedPerNode,
  metricsDataController.bytesReceivedPerPod,
  (req, res) => {
    const chartData = {
      getCPUUsageByNamespace: res.locals.getCPUUsageByNamespace,
      getCPUUsageByPod: res.locals.getCPUUsageByPod,
      getCPUUsageByNode: res.locals.getCPUUsageByNode,
      getMemoryUsageByNamespace: res.locals.getMemoryUsageByNamespace,
      getMemoryUsageByNode: res.locals.getMemoryUsageByNode,
      getMemoryUsageByPod: res.locals.getMemoryUsageByPod,
      bytesTransmittedPerNamespace: res.locals.bytesTransmittedPerNamespace,
      bytesTransmittedPerNode: res.locals.bytesTransmittedPerNode,
      bytesTransmittedPerPod: res.locals.bytesTransmittedPerPod,
      bytesReceivedPerNamespace: res.locals.bytesReceivedPerNamespace,
      bytesReceivedPerNode: res.locals.bytesReceivedPerNode,
      bytesReceivedPerPod: res.locals.bytesReceivedPerPod,
    };
    res.status(200).json(chartData);
  }
);

prometheusRouter.get(
  '/cpubynode',
  prometheusController.getCpuUsageByNode,
  (req, res) => {
    res.status(200).json(res.locals.getCpuUsageByNode);
  }
);

prometheusRouter.get(
  '/memorybynode',
  prometheusController.getMemoryUsageByNode,
  (req, res) => {
    res.status(200).json(res.locals.getMemoryUsageByNode);
  }
);

prometheusRouter.get(
  '/cpubypod',
  prometheusController.getCpuUsageByPod,
  (req, res) => {
    res.status(200).json(res.locals.getCpuUsageByPod);
  }
);

prometheusRouter.get(
  '/memorybypod',
  prometheusController.getMemoryUsageByPod,
  (req, res) => {
    res.status(200).json(res.locals.getMemoryUsageByPod);
  }
);

prometheusRouter.get(
  '/cpuUtilization',
  prometheusController.getCpuUtilization,
  (req, res) => {
    res.status(200).json(res.locals.cpuUtilization);
  }
);

module.exports = prometheusRouter;
