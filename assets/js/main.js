let btnToggle = document.querySelector(".btn-toggle");
let mobileMenu = document.getElementById("mobile-menu");

let lst = JSON.parse(localStorage.getItem("wallet")) || [];

let lstitems = [["descreption", "date", "category"], "amount"]

let classTreats = "table-content text-center text-gray-900 py-3 bdr-btm scroll flex justify-between items-center";

let date = new Date().toISOString().split('T')[0];

  let btns = document.querySelectorAll(".btn");

  btns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (!(btn.classList.contains("active"))) {
      let remBtn = document.querySelector(".active"); // select activation Btn to remove active
      if (remBtn.textContent == "دخــل") {
        remBtn.classList.remove("active", "bg-green-600", "text-white");
        remBtn.classList.add("text-green-400");
        btn.classList.add("active", "bg-red-600", "text-white");
        btn.classList.remove("text-red-400");
      } else {
        remBtn.classList.remove("active", "bg-red-600", "text-white");
        remBtn.classList.add("text-red-400");
        btn.classList.add("active", "bg-green-600", "text-white");
        btn.classList.remove("text-green-400");
      }
    }
  })
  });

function handelScroll() {
  let allScroll = document.querySelectorAll(".scroll");
  allScroll.forEach((scroll, idx) => {
    let eleScroll = scroll.getBoundingClientRect().top;
    if (eleScroll <= window.innerHeight) {
      setTimeout(() => {
        scroll.classList.remove("scroll");
      }, idx * 200);
    }
  });
}

function handleMsg() {
  let emptyTablePar = document.querySelector(".table-p");

  let tableLen = document.querySelectorAll("ul");

  if (tableLen == 0) {
    emptyTablePar.classList.add("hidden");
  } else {
    emptyTablePar.classList.remove("hidden");
  }
}

window.addEventListener("load", handelScroll);

window.addEventListener("scroll", handelScroll);

function addElement(i, tableTitles) {
  let ul = document.createElement("ul");

  ul.className = classTreats;
  
  if (i % 2 != 0) {
    ul.classList.add("bg-gray-100");
  }

    let flagForLi = false;

    if (lst[i]["treat"] == "صــرف" ) {
      flagForLi = true;
    }

    
    if (lst[i]["treat"]) {
      let li = document.createElement("li");
      let icon = document.createElement("i");
      if (!flagForLi) {
        icon.className = "fa-solid fa-up-long text-green-600 text-xl my-3";
      } else {
        icon.className = "fa-solid fa-down-long text-red-600 text-xl my-3";
      }
      li.append(icon);
      ul.append(li);
  }

    for (let j = 0; j < 2; j++) {

      let li = document.createElement("li");
      let desTitle = document.createElement("h4");

      desTitle.className = "font-bold";
      
      let titleDescreption = document.createElement("p");
      if (j == 0) {
        desTitle.textContent = lst[i]["transaction"][lstitems[j][0]];
        titleDescreption.textContent = lst[i]["transaction"][lstitems[j][1]] + " | "+ lst[i]["transaction"][lstitems[j][2]]
      } else {
        desTitle.textContent = lst[i]["transaction"][lstitems[j]] + " جنيه";
        titleDescreption.textContent = lst[i]["treat"]
      }

      if (!flagForLi) {
        desTitle.classList.add("text-green-600");
      } else {
        desTitle.classList.add("text-red-600")
      }

      titleDescreption.className = "text-gray-400 text-xs";

      li.style.textAlign = "center";

      li.append(desTitle, titleDescreption);

      ul.append(li);

  }

  let editLi = document.createElement("li");

  editLi.classList.add("flex", "justify-center", "md:gap-5", "gap-2", "text-green-400");

  let editicon = document.createElement("i");

  editicon.classList.add("fa-solid", "fa-pen");

  editicon.addEventListener("click", (e) => {
    let popBox = document.querySelector(".pop-box");
    popBox.style.display = "block";
    let pressed = false;
    let startX, startY, posX, posY;

    // handle popBox Long press
    popBox.addEventListener("mousedown", (e) => {
      pressed = true;
      startX = e.clientX;
      posX = popBox.offsetLeft;

      startY = e.clientY;
      posY = popBox.offsetTop;

      popBox.style.cursor = "grabbing";
      document.body.style.userSelect =  "none";
    });

    // handle popBox mouse up
    document.addEventListener("mouseup", () => {
      pressed = false;
      popBox.style.cursor = "grab"
      document.body.style.userSelect =  "auto";
    })

    // handle moving popBox
    document.addEventListener("mousemove", (e) => {
      if (!pressed) return
      let x = startX - e.clientX;
      let y = startY - e.clientY;

      popBox.style.left = `${posX - x}px`;
      popBox.style.top = `${posY - y}px`;

      }
    )

    // for mobile moving
    // handle popBox Long press
    popBox.addEventListener("touchstart", (e) => {
      pressed = true;
      startX = e.touches[0].clientX;
      posX = popBox.offsetLeft;

      startY = e.touches[0].clientY;
      posY = popBox.offsetTop;
      document.body.style.userSelect =  "none";
    });

    // handle popBox touch up
    document.addEventListener("touchend", () => {
      pressed = false;
      document.body.style.userSelect =  "auto";
    })

    // handle moving popBox
    document.addEventListener("touchmove", (e) => {
      if (!pressed) return;
      let x = startX - e.touches[0].clientX;
      let y = startY - e.touches[0].clientY;

      popBox.style.left = `${posX - x}px`;
      popBox.style.top = `${posY - y}px`;

      }
    )

    let targetEle = e.target.parentElement.parentElement; // Select element which wil been edited
    targetEle.classList.add("target");

    function closePopBox() {
      targetEle.classList.remove("target");
      popBox.style.display = "none";
    }

    let closeBtn = document.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
      closePopBox();
    })

      let inputs = document.querySelectorAll(".pop-box input");
      let activeBtn = document.querySelector(".btn.active");
    
    
    
    let idx = Array.from(document.querySelectorAll("ul")).indexOf(targetEle);
    if (lst[idx]["treat"] != activeBtn.textContent) {
      if (lst[idx]["treat"] != "دخــل" && activeBtn.textContent == "دخــل") {
      activeBtn.classList.remove("active", "bg-green-600", "text-white")
      activeBtn.classList.add("text-green-400");
      activeBtn = activeBtn.nextElementSibling;
      activeBtn.classList.add("active", "bg-red-600", "text-white");
      activeBtn.classList.remove("text-red-400");
      console.log(activeBtn)
    } else {
      activeBtn.classList.remove("active", "bg-red-600", "text-white")
      activeBtn.classList.add("text-red-400");
      activeBtn = activeBtn.previousElementSibling;
      activeBtn.classList.add("active", "bg-green-600", "text-white");
      activeBtn.classList.remove("text-green-400");
    }
    }

      inputs.forEach((input) => {
        input.value = lst[idx]["transaction"][input.id];
      })


    let editBtn = document.querySelector(".sub-btn");
    editBtn.addEventListener("click", () => {
      inputs.forEach((input) => {
        lst[idx]["transaction"][input.id] = input.value;
      });
      activeBtn = document.querySelector(".btn.active");
      lst[idx]["treat"] = activeBtn.textContent;

      // after add content of popBox
      closePopBox();

      localStorage.setItem("wallet", JSON.stringify(lst));
      window.location.reload();
    })
  })


  // Delete Treat
  let delIcon = document.createElement("i");

  delIcon.classList.add("fa-solid", "fa-trash", "output");

  delIcon.addEventListener("click", (e) => {
    let targetEle = e.target.parentElement.parentElement;
    targetEle.classList.add("target");
    let idx = Array.from(document.querySelectorAll("ul")).indexOf(targetEle);
    lst = lst.filter((item, index) => index !== idx); // update lst without deleted item
    localStorage.setItem("wallet", JSON.stringify(lst))
    targetEle.classList.add("scroll");
    setTimeout(() => {
      targetEle.remove();
    }, 200);
    handleMsg();
  })

  if (document.location.pathname == "/history.html") {
    editLi.append(editicon, delIcon);
    ul.append(editLi);
  }


  tableTitles.append(ul);
}


if (document.location.pathname == "/index.html") {
  let headers = document.querySelectorAll("h3");

  let tableTitles = document.querySelector(".table-titles");

  let totalIncomes = 0;
  let totalCosts = 0;

  let saving = localStorage.getItem("save") || 0;

  lst.forEach((op) => {
    if (op["treat"] === "دخــل") {
      totalIncomes += parseInt(op["transaction"]["amount"]);
    } else {
      totalCosts += parseInt(op["transaction"]["amount"]);
    }
  })

  headers[0].textContent = `${totalIncomes} `;
  headers[1].textContent = `${totalCosts} `;
  headers[2].textContent = `${totalIncomes - totalCosts - saving} `;
  headers[3].textContent = `${saving} `;

  headers.forEach((el) => {
    let span = document.createElement("span");
    span.textContent = "جنيه";
    el.append(span);
  })

  // Select a empty msg
  let p = document.querySelector(".table-p");


  if (lst.length == 0) {
    p.classList.remove("hidden");
  } else {
    p.classList.add("hidden");

    if (lst.length < 5) {
      counter = 0;
    } else {
      counter = lst.length - 5; // to get last 5 treats in lst
    }

    for (let i = lst.length - 1; i > counter - 1; i--){
      addElement(i, tableTitles);
    }
  }

  let lstCat = [];

  
  lst.forEach((cat) => {
    if (cat["treat"] == "صــرف") {
      lstCat.push(cat["transaction"]["category"]);
    }
  })

  
  let xValues = Array.from(new Set(lstCat));
  let yValues = [];

  xValues.forEach((cat) => {
    let totalCat = 0;
    lst.forEach((value) => {
      if (value["transaction"]["category"] == cat && value["treat"] == "صــرف") {
        totalCat += Number(value["transaction"]["amount"]);
      }
    })
    yValues.push(totalCat);
  })

  let barColors = [
    "#21b378",
    "#2ba4e0",
    "#e85b5b",
    "#1f80b4",
    "#0d8a5c",
    "#cc3f3f",
    "#a2d9ce" 
  ];

  let boxChart = document.querySelector(".chart");

  let pChart = document.querySelector(".chart p");
  let chart = document.getElementById("myChart");
  if (lstCat.length != 0) {
    pChart.classList.add("hidden");
  } else {
    chart.style.display = "none";
    pChart.classList.remove("hidden");
  }
  window.onscroll = () => {
    if (!boxChart.classList.contains("scroll")) return;
    else {
    new Chart("myChart", {
      type: "pie",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        animation: {
        delay: 1000,  // 1 second delay
        duration: 1500
      }
      }
    });
    }
    
  }
}

let flag = false;

// handle menuBtn for phone view
btnToggle.addEventListener("click", () => {
  if (flag) {
    flag = false;
    mobileMenu.classList.remove("appear-menu");
    mobileMenu.classList.add("hidden-menu");
    setTimeout(() => {
      mobileMenu.setAttribute("hidden", "");
    }, 300);
  } else {
    flag = true;
    mobileMenu.removeAttribute("hidden");
    setTimeout(() => {
      mobileMenu.classList.remove("hidden-menu");
      mobileMenu.classList.add("appear-menu");
    }, 300)
  }
});


if (document.location.pathname == "/input.html") {

  let dateInput = document.getElementById("date");

  dateInput.value = `${date}`;

  let inputs = document.querySelectorAll("input");

  let saveBtn = document.querySelector(".sub-btn");

  let cat = document.querySelector("div.cat");
  let catRec = document.querySelectorAll(".cat-rec");

  let categories = [];

  catRec.forEach((category) => {
    if (category.textContent != "راتب") {
      categories.push(category.textContent);
    }
  })

  localStorage.setItem("categories", JSON.stringify(categories));

  let checkIcons = document.querySelectorAll(".check");


  inputs[0].addEventListener("input", () => {
    cat.classList.add("hidden");
    catRec.forEach((c) => {
      c.classList.add("bg-green-200");
      c.classList.remove("bg-green-600");
    });
    checkIcons.forEach((icon) => {
      icon.classList.add("hidden");
    })
    
    if (inputs[0].value == "") {
      cat.classList.remove("hidden");
    }
  });

  inputs[0].addEventListener("focus", () => {

    cat.classList.remove("hidden");
    catRec.forEach((catR) => {
      catR.addEventListener("click", (e) => {
        catRec.forEach((c) => {
        c.classList.add("bg-green-200");
        c.classList.remove("bg-green-600");
      })
        e.target.classList.remove("bg-green-200");
        e.target.classList.add("bg-green-600");
        checkIcons.forEach((icon) => {
          icon.classList.add("hidden");
          e.target.firstChild.classList.remove("hidden");
        })
        inputs[0].value = e.target.lastChild.textContent;
      })
    })
  })

  inputs.forEach((input) => {
    if (input != inputs[0]) {
      input.addEventListener("focus", () => cat.classList.add("hidden"));
    }
  })

    saveBtn.addEventListener("click", () => {

      let treatming = {
        "treat": "",
        "transaction": {
          "date": "",
          "descreption" : "",
          "category": "",
          "amount": ""
        }
      }

      // modify treatming[treat] nor "دخــل | صــرف"
      treatming["treat"] = document.querySelector(".active").textContent;

      // modify other values
      inputs.forEach((input) => {
        treatming["transaction"][input.id] = input.value;
      });

      lst.push(treatming);
      localStorage.setItem("wallet", JSON.stringify(lst));

      inputs.forEach((input) => {
        if (input.id != "date") {
          input.value = "";
        }
      })

      let msg = document.querySelector(".msg");

      msg.classList.remove("hidden");

      setTimeout(() => {
        msg.classList.add("hidden");
      }, 500);
  });
}

let dateIpts = document.querySelectorAll("input[type = 'date']");

  dateIpts.forEach((ipt) => {
    ipt.value = `${date}`;

    ipt.max = `${date}`;

    ipt.onclick = () => {
      ipt.showPicker();
    }
  })

  function catSelected() {
    const selected = document.querySelector(".selected");

    selected.textContent = "كل الأصناف";

    const options = document.querySelector(".options");

    let optionsLst = [];

    function pushElement(treat) {
        optionsLst.push(treat);
        let optEle = document.createElement("div");
        optEle.textContent = treat;
        options.append(optEle);
    }

    let categories = JSON.parse(localStorage.getItem("categories"));

    categories.forEach((treat) => {
      pushElement(treat);
    })

    if (document.location.pathname == "/history.html") {
      pushElement("راتب");
    }

    let selFlag = false;

    selected.onclick = () => {
      if (!selFlag) {
        selected.style.borderColor = "#3dbf94";
        selFlag = false;
      } else {
        selected.style.borderColor = "#b0f0db ";
        selFlag = true;
      }
      options.style.display = options.style.display === "block" ? "none" : "block";
    };

    options.querySelectorAll("div").forEach(opt => {
      opt.onclick = () => {
        selected.textContent = opt.textContent;
        options.style.display = "none";
      };
    });
    }

if (document.location.pathname == "/history.html") {

  dateIpts[0].addEventListener("input", () => {
      dateIpts[1].min = dateIpts[0].value;
    })

  let tableTitles = document.querySelector(".box-table");

  let p = document.querySelector(".table-p");


  if (lst.length == 0) {
    p.classList.remove("hidden");
  } else {
    p.classList.add("hidden");

    for (let i = 0; i < lst.length; i++){
      addElement(i, tableTitles);
    }
  }

  catSelected();

  let btn = document.querySelector(".btn");

  function addSearchEle(date, table, idx) {
    date.style.display = "flex";
    setTimeout(() => {
      date.classList.remove("scroll");
    }, 100 * idx);
  }

  let lstDates = document.querySelectorAll(".table-content");

  btn.onclick = () => {
    let firstDate = new Date(dateIpts[0].value);
    let endDate = new Date(dateIpts[1].value);
    const selected = document.querySelector(".selected");
    let sel = selected.textContent;

    let boxTable = document.querySelector(".heading + .box");


    lstDates.forEach((date, idx) => {
      if (!(firstDate <= new Date(lst[idx]["transaction"]["date"]) && endDate >= new Date(lst[idx]["transaction"]["date"]) && (sel === lst[idx]["transaction"]["category"] || sel === "كل الأصناف"))) {
        date.classList.add("scroll");
        setTimeout(() => {
          date.style.display = "none";
        }, 200);
      } else {
        addSearchEle(date, boxTable, idx);
      }
    });

    setTimeout(() => {
      let pFlag = document.querySelectorAll(".table-content.scroll");
      if (pFlag.length == 0) {
        p.classList.remove("hidden");
      } else {
        p.classList.add("hidden");
      }
    }, 200)

  }
}

if (document.location.pathname == "/settings.html") {
  let budgetLst = JSON.parse(localStorage.getItem("budget")) || [];

  let budgetBox = document.querySelector(".budget");

  budgetLst.forEach((item) => {
    let divItem = document.createElement("div");
    divItem.className = "catBudget";
    let h3 = document.createElement("h3");
    h3.classList.add("mb-3")
    h3.textContent = item["category"];
    let barProgress = document.createElement("span");
    barProgress.className = "bar-progress";
    let spanBar = document.createElement("span");
    spanBar.className = "scroll";
    barProgress.append(spanBar);
    let spanAmount = document.createElement("span");
    spanAmount.className = "block text-left text-red-300 font-bold";
    
    let totalCat = 0;
    
    lst.forEach((treat) => {
      if (treat["treat"] == "صــرف") {
        if (treat["transaction"]["category"] == item["category"]) {
          totalCat += Number(treat["transaction"]["amount"]);
        }
      }
    })

    let root = document.querySelector(":root");
    
    root.style.setProperty('--barWidth-idx', `${Number(totalCat) * 100 / Number(item["amount"])}%`);
    
    spanBar.style.width = `${root.style.getPropertyValue("--barWidth-idx")}`

    spanAmount.textContent = `${Number(totalCat)} / ${item["amount"]}`;

    divItem.append(h3, barProgress, spanAmount);

    budgetBox.append(divItem);
  })



  catSelected();

  const selected = document.querySelector(".selected");
  let opt = document.querySelectorAll(".options div");

  let selFlag = false;

  selected.addEventListener("click",  () => {
    if (!selFlag) {
      selected.style.borderColor = "#f0c8c8";
      selFlag = true;
    } else {
      selected.style.borderColor = "#d32525";
      selFlag = false;
    }
    opt.forEach((op) => {
      op.addEventListener("click", () => {
        selected.style.borderColor = "#d32525";
        selFlag = false;
      })
    })
  })


  let subBtn = document.querySelectorAll(".sub-btn");

  subBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
      if (e.target.id == "save") {
        let save = document.querySelector("input#save");
        localStorage.setItem("save", save.value);
      } else {

        let budget = document.querySelector("input#budget");
        if (budgetLst.some((e) => selected.textContent == e["category"])) {
          budgetLst.forEach((item) => {
            if (item["category"] == selected.textContent) {
              item["amount"] = budget.value;
            }
          })
        } else {
          if (selected.textContent == "كل الأصناف") {
            let cat = JSON.parse(localStorage.getItem("categories"));

            budgetLst = [];

            cat.forEach((category) => {
              let budgetItem = {
              "category": "",
              "amount": ""
              }
              budgetItem["category"] = category;
              budgetItem["amount"] = budget.value;
              budgetLst.push(budgetItem);
            })
          } else {
            let budgetItem = {
            "category": "",
            "amount": ""
            }
            budgetItem["category"] = selected.textContent;
            budgetItem["amount"] = budget.value;

            budgetLst.push(budgetItem);
          }

      }
      localStorage.setItem("budget", JSON.stringify(budgetLst));
      }
      window.location.reload();
    })
  })
}
