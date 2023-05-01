pipeline {
    agent any
    stages {
        stage('Build Docker Images') {
            steps {
                script {
                    bat 'docker build -t user ./UserManagement'
                    bat 'docker build -t product ./ProductManagement'
                    bat 'docker build -t order ./OrderManagement'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    bat 'kubectl delete deployments --all'
                    bat 'kubectl delete services --all'
                    bat 'kubectl apply -f ./k8s/'
                }
            }
        }
    }
}