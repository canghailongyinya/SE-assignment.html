let students = [];
let weights = [];
let absences = [];

// 初始化默认数据
function initializeDefaultData() {
  students = [
    "谢慧豪", "肖金洋", "廖嘉辉", "李锐钊", "罗斯", "沈嘉乐", "李佳音", "丁烁芝",
    "王宥森", "严浩文", "赖鼎昭", "朱潇瑶", "刘盛邦", "黄润轩", "许梓烁", "杨鑫",
    "詹伟翔", "章豪斌", "钟晨晖", "丁奕轩", "黄梓城", "彭志泓", "王阳明", "吴承徽",
    "吴佳霖", "吴乐超", "吴睿", "吴深荣", "吴玟欣", "吴晓恒", "吴修远", "肖睿",
    "肖添", "谢家和", "谢润文", "熊昊翔", "熊彦钧", "徐观炼", "徐上", "徐子欣",
    "许才明", "许君兰", "闫麟昊", "阳文轩", "杨凯", "杨立新", "杨铭昊", "杨培凯",
    "杨希凯", "杨晓乐", "杨正宇", "姚书璟", "姚宇翔", "叶崇杰", "游璐玮", "于远洋",
    "余俊翰", "余鑫", "张苇航", "元朗曦", "袁舜骐", "岳峻宇", "詹佳烨", "张博然",
    "张浩宇", "张皓昱", "张景翔", "张洛瑜", "张人心", "张若璇", "张文坚", "张文翔",
    "张相钊", "张晔", "张逸", "张颖琳", "张宇然", "张玉瑶", "张誉方", "张越",
    "赵施琦", "郑达维", "郑浩翔", "郑皓", "郑晋凯", "郑思扬", "郑晓丰", "郑鑫宇",
    "郑芸熙", "职雨欣", "钟泓瑨", "钟俊喆", "钟思玥", "钟旺烜", "周海铭", "周宏杰",
    "周嘉尉", "周逸", "周雨桐", "周梓枫", "邹书承", "吴永聪", "肖淇", "徐泓昊",
    "薛炜鹏", "张周骁", "周子健", "常淇博", "陈畅", "陈大有", "陈龙", "陈仁培",
    "陈思谋", "段玉飞", "古康杰", "郭延庚", "何晓文", "胡泉", "李延泽", "廖雪欣",
    "林翠敏", "林昀熠", "龙宇海", "卢晓玲", "吕振宁", "郭靖宇"
  ];
  weights = new Array(students.length).fill(1);
  absences = new Array(students.length).fill(0);
}

// 从 CSV 文件加载数据
document.getElementById("fileInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    const lines = content.trim().split("\n");
    students = [];
    weights = [];
    absences = [];

    lines.forEach((line, index) => {
      if (index === 0) return; // 跳过标题行
      const [name, weight, absence] = line.split(",");
      students.push(name);
      weights.push(parseFloat(weight));
      absences.push(parseInt(absence, 10));
    });

    alert("数据已成功加载！");
  };
  reader.readAsText(file);
});

// 保存数据到 CSV 文件
document.getElementById("saveButton").addEventListener("click", () => {
  const csvContent = "姓名,权重,缺勤次数\n" +
    students.map((student, index) => `${student},${weights[index]},${absences[index]}`).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "students_data.csv";
  a.click();
});

// 根据权重随机选择学生
function getRandomStudent() {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < students.length; i++) {
    if (random < weights[i]) {
      return i; // 返回被选中学生的索引
    }
    random -= weights[i];
  }
}

// 处理点名结果
function handleAttendance(index, attended) {
  if (attended) {
    weights[index] = Math.max(weights[index] * 0.5, 0.1); // 最小权重为 0.1
  } else {
    absences[index]++;
    weights[index] = Math.min(weights[index] * 1.5, 10); // 最大权重为 10
  }
}

// 绑定点名按钮
document.getElementById("randomButton").addEventListener("click", () => {
  if (students.length === 0) {
    alert("请先加载学生数据！");
    return;
  }

  const index = getRandomStudent();
  const student = students[index];
  document.getElementById("result").innerText = student;

  setTimeout(() => {
    const attended = confirm(`${student} 是否到场？\n选择“确定”表示到场，选择“取消”表示缺勤。`);
    handleAttendance(index, attended);
  }, 0);
});

// 跳转到记录页面
document.getElementById("viewRecordsButton").addEventListener("click", () => {
  localStorage.setItem("students", JSON.stringify(students));
  localStorage.setItem("weights", JSON.stringify(weights));
  localStorage.setItem("absences", JSON.stringify(absences));
  window.location.href = "attendance.html";
});

// 初始化默认数据
initializeDefaultData();