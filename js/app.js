const app = new Vue({
  el: '#app',
  data: {
    currentPage: 'main',
    currentValue: null,
    currentStatus: 0,
    descriptionTable: [
      '良好',
      '尚可',
      '不健康',
      '危害'
    ],
    statusDescriptions: [
      '未連線',
      '連線中...',
      '已連線'
    ],
    buttonStatus: [
      '連線',
      '連線中...',
      '重新連線'
    ],
    backgroundColorTable: [
      '#bbbbbb',
      '#89c541',
      '#48b04b',
      '#388e3c',
      '#fcd700',
      '#ffc107',
      '#ff9800',
      '#ff5252',
      '#f44336',
      '#d32f2f',
      '#9d1cb2'
    ],
    deviceId: '',
    board: null
  },
  created() {
    // Create connection automatically if we have device ID already
    if (localStorage.deviceId) {
      this.deviceId = localStorage.deviceId;
      this.createBoard();
    }
  },
  methods: {
    switchPage(page) {
      this.currentPage = page;
    },
    createBoard() {
      if (!this.deviceId) {
        return;
      }

      const init = () => {
        if (this.board) {
          return;
        }

        this.currentStatus = 1;
        boardReady(this.deviceId, (board) => {
          let g3;

          this.board = board;
          this.currentStatus = 2;
          board.systemReset();
          board.samplingInterval = 250;
          board.on('error', this.boardErrorHandler);
          g3 = getG3(board, 14, 3);
          g3.read((value) => {
            this.currentValue = value.pm25;
          }, 1000);
        });
      };

      this.switchPage('main');
      localStorage.deviceId = this.deviceId;

      if (this.board) {
        this.resetStatus();
        // Disconnect existed board before re-create new one
        this.board.disconnect(() => {
          this.board = null;
          init();
        });
      } else {
        init();
      }
    },
    boardErrorHandler(err) {
      console.error(err);
      this.board = null;
      this.resetStatus();

      // Try to reconnect for one time only
      this.createBoard();
    },
    resetStatus() {
      this.currentStatus = 0;
      this.currentValue = null;
    },
    translateValue(value) {
      if (!value && value !== 0) {
        return '--';
      } else {
        return value.toString();
      }
    },
    getDescriptionByValue(value) {
      const valueLevels = [35, 53, 70];
      let description = '空氣品質：';

      if (!value && value !== 0) {
        return this.statusDescriptions[0];
      }

      // Loop through `valueLevels` to find out the range of current value,
      // and return corresponding description
      for (let i = 0; i <= valueLevels.length; i++) {
        if (value <= valueLevels[i]) {
          description += this.descriptionTable[0];
          return description;
        }
      }
      description += this.descriptionTable[3];
      return description;
    },
    getBackgroundColorByValue(value) {
      const valueLevels = [11, 23, 35, 41, 47, 53, 58, 64, 70];
      if (!value && value !== 0) {
        return this.backgroundColorTable[0];
      }

      // Loop through `valueLevels` to find out the range of current value,
      // and return corresponding background color
      for (let i = 0; i <= valueLevels.length; i++) {
        if (value <= valueLevels[i]) {
          return this.backgroundColorTable[++i];
        }
      }
      return this.backgroundColorTable[10];
    }
  }
})

// Apply animation when value is updated
const animationEnd = ((el) => {
  const animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    WebkitAnimation: 'webkitAnimationEnd',
  };

  for (const t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
})(document.createElement('div'));

app.$watch('currentValue', (value) => {
  $('.pm25-value').addClass('animated bounce').one(animationEnd, (e) => {
    $(e.target).removeClass('animated bounce');
  });
});
