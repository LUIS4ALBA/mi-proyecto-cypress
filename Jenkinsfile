pipeline {
    agent any

    // Esto le dice a Jenkins que use el Node que configuramos en el Paso 1
    tools {
        nodejs 'node25' 
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Instalando dependencias...'
                // Usamos ci en lugar de install para ambientes de CI/CD (es más limpio)
                sh 'npm ci || npm install'
            }
        }

        stage('Cypress Tests') {
            steps {
                echo 'Ejecutando pruebas de Cypress...'
                // Ejecutamos en modo headless (sin ventana)
                sh 'npx cypress run'
            }
        }
    }

    post {
        always {
            echo 'Finalizando ejecución...'
            // Intentamos guardar reportes si existen
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true
        }
        failure {
            echo 'Detección de fallos: Revisa el log de la consola y los videos.'
        }
    }
}