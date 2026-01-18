pipeline {
    agent any // Jenkins buscará cualquier nodo/agente disponible

    stages {
        stage('Checkout') {
            steps {
                // Aquí Jenkins baja tu código de GitHub/GitLab
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Instalando dependencias...'
                // Instalamos los paquetes necesarios
                sh 'npm install'
            }
        }

        stage('Cypress Tests') {
            steps {
                echo 'Ejecutando pruebas de Cypress...'
                // Corremos los tests. El flag --browser chrome es opcional
                sh 'npx cypress run --browser chrome'
            }
        }
    }

    post {
        always {
            // Esto se ejecuta siempre, pase lo que pase
            echo 'Guardando resultados...'
            // Si usas capturas de pantalla o videos, Jenkins los guarda aquí
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4, cypress/screenshots/**/*.png', allowEmptyArchive: true
        }
        success {
            echo '¡Pruebas superadas con éxito!'
        }
        failure {
            echo '¡Las pruebas fallaron! Revisa los videos guardados.'
        }
    }
}