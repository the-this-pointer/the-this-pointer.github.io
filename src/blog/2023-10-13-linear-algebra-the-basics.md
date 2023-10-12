---
title: Linear Algebra - The basics
author: Rsomething
date: '2023-10-13'
categories:
  - Robotics
tags:
  - physics
  - mathematics
---
This post is part of a bigger picture that I've dicided to do. As you know (or may not) the `linear algebra` plays a crucial role in Robotics.
In this post we are going to bring some basic equations for future use, for those that are not familiar with these concepts.

<!-- more -->

## Introduction

#### Vector
The first we started with is `Vector`, that is a quantity having a direction as well as the magnitude.
Quantities like the mass and power have value, but when it comes to velocity or momentum is has a direction too.
We can show a vector using a arrow on top of it like this:

$$
\vec{p}=m\vec{v}
$$

You can show a vector as the list of numbers that is oriented horizontally or vertically, 
and it will have a row with multiple columns or a column with multiple rows respectively:


$$
\begin{bmatrix} 
a \\
b \\
c \\
\end{bmatrix}_{n \times 1}
\quad

\begin{bmatrix} 
a & b & c\\
\end{bmatrix}_{1 \times n}
\quad
$$

You can take the vectors as a special matrix which has only one row or column.
Now it's time to show the mathematical operations on vectors that is also true for the matrices as well.

#### Matrix
The matrix is the rectangular array of numbers, we know that a vector is a list of numbers with only one row/column, but the matrice has multiple rows and columns.

$$
\begin{bmatrix}
a & b & c\\
d & e & f\\
\end{bmatrix}_{n \times m}
$$

## Math Operations

### Addition / Subtraction

For vector addition / subtraction, the vectors should have the same dimensions. Suppose we have two vectors:

$$
\begin{bmatrix} 
a & b & c\\
\end{bmatrix}_{1 \times n}
\quad

\begin{bmatrix} 
d & e & f\\
\end{bmatrix}_{1 \times n}
\quad
$$

The result of addition would be:

$$

\begin{bmatrix} 
a & b & c\\
\end{bmatrix}_{1 \times n}
\pm
\begin{bmatrix} 
d & e & f\\
\end{bmatrix}_{1 \times n}
=
\begin{bmatrix} 
a \pm d & b \pm e & c \pm f\\
\end{bmatrix}_{1 \times n}

$$

### Multiplying

Multiplying by scalar is as simple as multiplying all elements with the raw number.

$$

\begin{bmatrix} 
a & b & c\\
\end{bmatrix}_{1 \times n}
\times
2
=
\begin{bmatrix} 
2*a & 2*b & 2*c\\
\end{bmatrix}_{1 \times n}

$$

In this situation you can move the scalar after or before the matrice. The result is same. 
But you should know if you want to multiply a matrice with another matrice you **CAN'T** move them like so, the result would be different. 
So if we have two matrices $A$ and $B$:

$$
A \times B \neq B \times A
$$

It worth noting that matrice multiplication is associative:

$$
A \times (B \times C) = (A \times B) \times C
$$

Also you should check the dimensions for the matrices before multiplication. 
You can multiply them if the number of columns in first matrice is equal to the number of rows in second matrice $m = k$ 
and the dimensions of resulting matrice would be $n \times l$:

$$
A_{n \times m} \times B_{k \times l} = C_{n \times l} 
$$

The process of multiplying two matrices are as below, you should take a row from the left matrice and a column from right one:

$$
\def\ra#1{\color{red}#1}

\begin{bmatrix}
\ra1 & \ra2 & \ra3\\
4 & 5 & 6\\
\end{bmatrix}_{2 \times 3}
\times
\begin{bmatrix} 
\ra0 & 3 & 2\\
\ra4 & 1 & 8\\
\ra6 & 9 & 5\\
\end{bmatrix}_{3 \times 3}
=
\begin{bmatrix} 
\ra26 & 32 & 33\\
56 & 71 & 78\\
\end{bmatrix}_{2 \times 3}

$$

You can take the red elements as two vectors multiplication, a special case of matrice multiplication and named `Dot Product` or `Scalar Product`, 
it is the process of multiplying corresponding elements and sum up them to get the final result.
In the geometrical view, it is the result of multiplying the length of two vectors and the cosine of the angle between them.
Because the $\cos(\pi/2) = 0$, it is useful for finding **Orthogonal** vectors.
So for the highlighted items it would be:

$$
(1 * 0) + (2 * 4) + (3 * 6) = 26
$$
$$
(1 * 3) + (2 * 1) + (3 * 9) = 32
$$
$$
\vdots
$$

### Inverse & Determinant
::: warning
TBD
:::

### Elimination
::: warning
TBD
:::

<!-- more -->
