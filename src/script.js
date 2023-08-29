// Sélection de l'élément d'entrée pour les nouvelles tâches
const newTaskInput = document.querySelector("#new-task input");
// Sélection de la division pour afficher les tâches
const tasksDiv = document.querySelector("#tasks");
// Déclaration de variables pour les tâches, les boutons de suppression et d'édition
let deleteTasks, editTasks, tasks;
// Initialisation de la variable pour la note de mise à jour
let updateNote = "";
// Initialisation de la variable de comptage
let count;
// Lorsque la fenêtre est complètement chargée
window.onload = () => {
  // Réinitialisation de la note de mise à jour
  updateNote = "";
  // Obtenir le nombre de clés dans le stockage local
  count = Object.keys(localStorage).length;
  displayTasks();
};
// Fonction pour afficher les tâches
const displayTasks = () => {
  // Vérifier s'il y a des tâches dans le stockage local
  if (Object.keys(localStorage).length > 0) {
    tasksDiv.style.display = "block"; // Afficher la division des tâches
  } else {
    tasksDiv.style.display = "none"; // masquer la division des tâches
  }
  // Effacer le contenu de la division des tâches
  tasksDiv.innerHTML = "";
  // Obtenir toutes les clés du stockage local et les trier
  let tasks = Object.keys(localStorage);
  tasks = tasks.sort();
  // Boucler à travers les clés pour créer les éléments d'affichage
  for (let key of tasks) {
    let classValue = "";
    // Obtenir la valeur du stockage local pour la clé actuelle
    let value = localStorage.getItem(key);
    // Création d'une nouvelle division pour chaque tâche
    const taskInnerDiv = document.createElement("div");
    taskInnerDiv.classList.add("task");
    taskInnerDiv.setAttribute("id", key);
    //cette ligne de code crée un élément <span> à l'intérieur de chaque élément de tâche.
    //Le contenu de ce <span> est extrait de la clé de la tâche dans le stockage local en
    //utilisant la méthode split pour diviser la clé et en sélectionnant la deuxième partie
    // qui représente la description de la tâche. Cela affiche le texte de la description de
    // la tâche à l'intérieur de chaque élément de la liste.

    taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;
    //  ces trois lignes de code créent un élément bouton avec la classe CSS "edit" et le texte "Éditer" à l'intérieur.
    // Cet élément bouton est ensuite utilisé pour ajouter un bouton d'édition à chaque élément
    // de tâche dans la liste. Cette approche permet de créer dynamiquement des boutons d'édition
    // pour chaque tâche, plutôt que d'avoir à les ajouter manuellement dans le code HTML statique.
    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.textContent = "Éditer";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "Supprimer";

    taskInnerDiv.appendChild(editButton);
    taskInnerDiv.appendChild(deleteButton);
    tasksDiv.appendChild(taskInnerDiv);
  }
  //, cette fonction ajoute un écouteur d'événements "click" à chaque bouton d'édition. Lorsque l'utilisateur
  //clique sur un bouton d'édition, le code désactive tous les autres boutons d'édition, récupère le nom de la
  //tâche associée au bouton et prépare l'ID de cette tâche pour les opérations d'édition ultérieures.

  editTasks = document.getElementsByClassName("edit");
  Array.from(editTasks).forEach((element, index) => {
    element.addEventListener("click", (e) => {
      e.stopPropagation();
      disableButtons(true);
      const parent = element.parentElement;
      newTaskInput.value = parent.querySelector("#taskname").textContent;
      updateNote = parent.id;
    });
  });

  deleteTasks = document.getElementsByClassName("delete");
  Array.from(deleteTasks).forEach((element, index) => {
    element.addEventListener("click", (e) => {
      e.stopPropagation();
      const parent = element.parentElement;
      removeTask(parent.id);
      parent.remove();
      count -= 1;
    });
  });
};

const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

const removeTask = (taskValue) => {
  localStorage.removeItem(taskValue);
  displayTasks();
};

const updateStorage = (index, taskValue, completed) => {
  localStorage.setItem(`${index}_${taskValue}`, completed);
  displayTasks();
};

document.querySelector("#push").addEventListener("click", () => {
  disableButtons(false);
  if (newTaskInput.value.length === 0) {
    alert("Veuillez saisir une tâche");
  } else {
    if (updateNote === "") {
      updateStorage(count, newTaskInput.value, false);
    } else {
      let existingCount = updateNote.split("_")[0];
      removeTask(updateNote);
      updateStorage(existingCount, newTaskInput.value, false);
      updateNote = "";
    }
    count += 1;
    newTaskInput.value = "";
  }
});
