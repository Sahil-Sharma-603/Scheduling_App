public int tComp (int [][] A) {
    int[][] table = new int [-1][-1];//create a table and values intialize to -1
return tRecurse (A, A.length-1, table);
}

private int tRecurse (int [][] A, int i, int [][] table) {
int result = 0;
int j = i-1;



if (i < 0)
     result = 0;
else if(i==0)
    result = A[i][1] - A[i][0];
else if(i> 0){
    while (j >= 0 && A[j][1] >= A[i][0])
    j--;
    result = Math.max( tRecurse(A, i-1) , A[i][1] - A[i][0] + tRecurse(A, j) );
}
   return result;
}